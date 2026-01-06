'use client';

import React, { useState } from 'react';
import { Goal } from '@/lib/types';
import { Card, Button, ProgressBar } from '../ui/primitives';
import { formatCurrency } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useGoals } from '@/lib/store';
import { Modal } from '../ui/Modal';
import { AddContributionForm } from './AddContributionForm';

interface GoalCardProps {
    goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
    const { exchangeRate } = useGoals();
    const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);

    const totalSaved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);
    const remaining = Math.max(0, goal.targetAmount - totalSaved);

    // Conversion helper
    const convert = (amount: number, from: 'USD' | 'INR', to: 'USD' | 'INR') => {
        if (from === to) return amount;
        if (from === 'USD' && to === 'INR') return amount * exchangeRate;
        if (from === 'INR' && to === 'USD') return amount / exchangeRate;
        return amount;
    };

    const amountInOriginal = formatCurrency(goal.targetAmount, goal.currency);

    // Converted amount text
    const convertedCurrency = goal.currency === 'USD' ? 'INR' : 'USD';
    const convertedAmount = convert(goal.targetAmount, goal.currency, convertedCurrency);
    const amountInConverted = formatCurrency(convertedAmount, convertedCurrency);

    return (
        <>
            <Card className="flex flex-col gap-4 transition-shadow hover:shadow-md">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">{goal.name}</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-2xl font-bold text-brand">
                                {amountInOriginal}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {amountInConverted}
                        </p>
                    </div>

                    {/* Completion Percentage Badge */}
                    <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        {Math.round((totalSaved / goal.targetAmount) * 100)}%
                    </div>
                </div>

                <div className="space-y-2 mt-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Progress</span>
                        <span className="text-gray-900 font-medium">
                            {formatCurrency(totalSaved, goal.currency)} saved
                        </span>
                    </div>
                    <ProgressBar value={totalSaved} max={goal.targetAmount} />
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mt-2 pt-4 border-t border-gray-50">
                    <span>
                        {goal.contributions.length} contribution{goal.contributions.length !== 1 ? 's' : ''}
                    </span>
                    <span>
                        {formatCurrency(remaining, goal.currency)} remaining
                    </span>
                </div>

                <Button
                    variant="ghost"
                    className="w-full mt-2 border border-dashed border-gray-300 hover:border-brand hover:bg-brand/5 hover:text-brand"
                    onClick={() => setIsContributionModalOpen(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contribution
                </Button>
            </Card>

            <Modal
                isOpen={isContributionModalOpen}
                onClose={() => setIsContributionModalOpen(false)}
                title="Add Contribution"
            >
                <AddContributionForm
                    goal={goal}
                    onSuccess={() => setIsContributionModalOpen(false)}
                    onCancel={() => setIsContributionModalOpen(false)}
                />
            </Modal>
        </>
    );
}
