'use client';

import React, { useState } from 'react';
import { Goal } from '@/lib/types';
import { Card, Button, ProgressBar } from '../ui/primitives';
import { formatCurrency, cn } from '@/lib/utils';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useGoals } from '@/lib/store';
import { Modal } from '../ui/Modal';
import { AddContributionForm } from './AddContributionForm';
import { motion, AnimatePresence } from 'framer-motion';

interface GoalCardProps {
    goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
    const { exchangeRate, removeGoal } = useGoals();
    const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const totalSaved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);
    const remaining = Math.max(0, goal.targetAmount - totalSaved);
    const isCompleted = totalSaved >= goal.targetAmount;

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
            <Card className={cn(
                "flex flex-col gap-4 transition-all duration-300 relative group",
                isCompleted ? "bg-green-50/50 border-green-100" : "hover:shadow-md"
            )}>
                {/* Delete Button (visible on hover or focus) */}
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to delete this goal?')) {
                            removeGoal(goal.id);
                        }
                    }}
                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Goal"
                >
                    <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-start pr-8">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            {goal.name}
                            {isCompleted && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Completed</span>}
                        </h3>
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
                    <div className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        isCompleted ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    )}>
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
                    <ProgressBar value={totalSaved} max={goal.targetAmount} className={isCompleted ? "bg-green-100" : ""} />
                    {isCompleted && (
                        <div className="h-full bg-green-500 rounded-full hidden" style={{ width: '100%' }} />
                    )}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mt-2 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="flex items-center gap-1 hover:text-brand transition-colors focus:outline-none"
                    >
                        <span>{goal.contributions.length} contribution{goal.contributions.length !== 1 ? 's' : ''}</span>
                        {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {!isCompleted && (
                        <span>
                            {formatCurrency(remaining, goal.currency)} remaining
                        </span>
                    )}
                </div>

                {/* Contribution History Collapsible */}
                <AnimatePresence>
                    {showHistory && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-2 space-y-2 max-h-40 overflow-y-auto pr-1">
                                {goal.contributions.length === 0 ? (
                                    <p className="text-xs text-center text-gray-400 italic py-2">No contributions yet.</p>
                                ) : (
                                    goal.contributions.map((c) => (
                                        <div key={c.id} className="flex justify-between text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                            <span>{new Date(c.date).toLocaleDateString()}</span>
                                            <span className="font-medium text-gray-900">+{formatCurrency(c.amount, goal.currency)}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    variant="ghost"
                    className="w-full mt-2 border border-dashed border-gray-300 hover:border-brand hover:bg-brand/5 hover:text-brand disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setIsContributionModalOpen(true)}
                    disabled={isCompleted}
                >
                    {isCompleted ? 'Goal Achieved! 🎉' : (
                        <>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Contribution
                        </>
                    )}
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
