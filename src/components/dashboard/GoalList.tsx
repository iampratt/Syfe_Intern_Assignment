'use client';

import React from 'react';
import { useGoals } from '@/lib/store';
import { GoalCard } from './GoalCard';
import { Target } from 'lucide-react';

export function GoalList() {
    const { goals } = useGoals();

    if (goals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No goals yet</h3>
                <p className="max-w-xs text-center mt-1">Create your first financial goal to start tracking your savings journey.</p>
            </div>
        );
    }

    const completedGoals = goals.filter(g => {
        const totalSaved = g.contributions.reduce((sum, c) => sum + c.amount, 0);
        return totalSaved >= g.targetAmount;
    });

    const activeGoals = goals.filter(g => {
        const totalSaved = g.contributions.reduce((sum, c) => sum + c.amount, 0);
        return totalSaved < g.targetAmount;
    });

    return (
        <div className="space-y-12">
            {activeGoals.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wider text-xs">Active Goals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeGoals.map((goal) => (
                            <GoalCard key={goal.id} goal={goal} />
                        ))}
                    </div>
                </div>
            )}

            {completedGoals.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wider text-xs flex items-center gap-2">
                        Completed Goals
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px]">{completedGoals.length}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                        {completedGoals.map((goal) => (
                            <GoalCard key={goal.id} goal={goal} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
