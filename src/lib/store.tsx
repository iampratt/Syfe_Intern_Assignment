'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Goal, Contribution, Currency } from './types';
import { fetchExchangeRate } from './api';

interface GoalsContextType {
    goals: Goal[];
    exchangeRate: number; // USD to INR
    lastUpdated: string | null;
    isLoading: boolean;
    error: string | null;
    addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'contributions'>) => void;
    addContribution: (goalId: string, contribution: Omit<Contribution, 'id'>) => void;
    refreshRates: () => Promise<void>;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const STORAGE_KEY = 'syfe-goals-planner';
const RATE_STORAGE_KEY = 'syfe-exchange-rate';

export function GoalsProvider({ children }: { children: React.ReactNode }) {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [exchangeRate, setExchangeRate] = useState<number>(85); // Default fallback
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const refreshRates = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const rate = await fetchExchangeRate();
            const timestamp = new Date().toISOString();
            setExchangeRate(rate);
            setLastUpdated(timestamp);

            localStorage.setItem(RATE_STORAGE_KEY, JSON.stringify({
                rate,
                timestamp
            }));
        } catch (err) {
            setError('Failed to update exchange rates. Using last known rate.');
        } finally {
            setIsLoading(false);
        }
    };

    // Load from local storage on mount
    useEffect(() => {
        const savedGoals = localStorage.getItem(STORAGE_KEY);
        const savedRate = localStorage.getItem(RATE_STORAGE_KEY);

        if (savedGoals) {
            try {
                setGoals(JSON.parse(savedGoals));
            } catch (e) {
                console.error('Failed to parse saved goals', e);
            }
        }

        if (savedRate) {
            try {
                const rateData = JSON.parse(savedRate);
                setExchangeRate(rateData.rate);
                setLastUpdated(rateData.timestamp);
            } catch (e) {
                console.error('Failed to parse saved rate', e);
            }
        } else {
            // Initial fetch if no rate saved
            refreshRates();
        }
        setIsInitialized(true);
    }, []);

    // Save to local storage whenever goals change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
        }
    }, [goals, isInitialized]);

    const addGoal = (newGoalData: Omit<Goal, 'id' | 'createdAt' | 'contributions'>) => {
        const newGoal: Goal = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            contributions: [],
            ...newGoalData,
        };
        setGoals(prev => [newGoal, ...prev]);
    };

    const addContribution = (goalId: string, contributionData: Omit<Contribution, 'id'>) => {
        setGoals(prev => prev.map(goal => {
            if (goal.id === goalId) {
                const newContribution: Contribution = {
                    id: crypto.randomUUID(),
                    ...contributionData,
                };
                // Sort contributions by date descending
                const updatedContributions = [...goal.contributions, newContribution]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                return {
                    ...goal,
                    contributions: updatedContributions
                };
            }
            return goal;
        }));
    };

    return (
        <GoalsContext.Provider value={{
            goals,
            exchangeRate,
            lastUpdated,
            isLoading,
            error,
            addGoal,
            addContribution,
            refreshRates
        }}>
            {children}
        </GoalsContext.Provider>
    );
}

export function useGoals() {
    const context = useContext(GoalsContext);
    if (context === undefined) {
        throw new Error('useGoals must be used within a GoalsProvider');
    }
    return context;
}
