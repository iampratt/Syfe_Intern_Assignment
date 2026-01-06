'use client';

import React from 'react';
import { useGoals } from '@/lib/store';
import { Button } from '../ui/primitives';
import { RefreshCw, TrendingUp, Target, Wallet } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';

export function DashboardHeader() {
    const { goals, refreshRates, lastUpdated, isLoading, exchangeRate } = useGoals();

    // Calculate generic totals in USD (as base)
    const stats = goals.reduce((acc, goal) => {
        const goalSaved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);

        // Normalized to USD
        const targetUSD = goal.currency === 'USD' ? goal.targetAmount : goal.targetAmount / exchangeRate;
        const savedUSD = goal.currency === 'USD' ? goalSaved : goalSaved / exchangeRate;

        // Progress for weighted average
        const progress = goal.targetAmount > 0 ? (goalSaved / goal.targetAmount) : 0;

        return {
            totalTargetUSD: acc.totalTargetUSD + targetUSD,
            totalSavedUSD: acc.totalSavedUSD + savedUSD,
            totalProgressSum: acc.totalProgressSum + Math.min(1, progress), // cap at 100% for average
        };
    }, { totalTargetUSD: 0, totalSavedUSD: 0, totalProgressSum: 0 });

    const overallProgress = goals.length > 0
        ? (stats.totalProgressSum / goals.length) * 100
        : 0;

    const totalTargetINR = stats.totalTargetUSD * exchangeRate;
    const totalSavedINR = stats.totalSavedUSD * exchangeRate;

    return (
        <div className="bg-brand text-brand-foreground rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <TrendingUp className="w-64 h-64 text-white -mt-10 -mr-10" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Financial Overview</h1>
                        <p className="text-brand-foreground/80 text-sm">Track your financial goals</p>
                    </div>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => refreshRates()}
                    isLoading={isLoading}
                    className="shadow-none border-brand-foreground/20 bg-brand-foreground/10 text-brand-foreground hover:bg-brand-foreground/20"
                >
                    <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                    Refresh Rates
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-brand-foreground/80">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-medium">Total Targets</span>
                    </div>
                    <div className="text-3xl font-bold">{formatCurrency(totalTargetINR, 'INR')}</div>
                    <div className="text-sm opacity-70 mt-1">{formatCurrency(stats.totalTargetUSD, 'USD')}</div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2 text-brand-foreground/80">
                        <Wallet className="w-4 h-4" />
                        <span className="text-sm font-medium">Total Saved</span>
                    </div>
                    <div className="text-3xl font-bold">{formatCurrency(totalSavedINR, 'INR')}</div>
                    <div className="text-sm opacity-70 mt-1">{formatCurrency(stats.totalSavedUSD, 'USD')}</div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2 text-brand-foreground/80">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Overall Progress</span>
                    </div>
                    <div className="text-3xl font-bold">{overallProgress.toFixed(1)}%</div>
                    <div className="text-sm opacity-70 mt-1">Completion across {goals.length} goal{goals.length !== 1 ? 's' : ''}</div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-brand-foreground/10 flex justify-between items-center text-xs opacity-70 relative z-10">
                <span>Exchange Rate: 1 USD = {formatCurrency(exchangeRate, 'INR').replace('₹', '₹ ')}</span>
                <span>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}</span>
            </div>
        </div>
    );
}
