'use client';

import React, { useState } from 'react';
import { useGoals } from '@/lib/store';
import { Button, Input } from '../ui/primitives';
import { Goal } from '@/lib/types';

interface AddContributionFormProps {
    goal: Goal;
    onSuccess: () => void;
    onCancel: () => void;
}

export function AddContributionForm({ goal, onSuccess, onCancel }: AddContributionFormProps) {
    const { addContribution } = useGoals();
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid positive amount');
            return;
        }

        addContribution(goal.id, {
            amount: numAmount,
            date,
        });

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="p-4 bg-gray-50 rounded-lg mb-2">
                <p className="text-sm text-gray-500">Adding to</p>
                <p className="font-semibold text-gray-900">{goal.name}</p>
            </div>

            <Input
                label={`Amount (${goal.currency})`}
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                autoFocus
            />

            <Input
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]} // No future dates
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    Add Contribution
                </Button>
            </div>
        </form>
    );
}
