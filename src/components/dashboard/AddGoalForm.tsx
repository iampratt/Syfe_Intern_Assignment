'use client';

import React, { useState } from 'react';
import { useGoals } from '@/lib/store';
import { Button, Input, Select } from '../ui/primitives';
import { Currency } from '@/lib/types';

interface AddGoalFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function AddGoalForm({ onSuccess, onCancel }: AddGoalFormProps) {
    const { addGoal } = useGoals();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState<Currency>('USD');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Goal name is required');
            return;
        }

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid positive amount');
            return;
        }

        addGoal({
            name: name.trim(),
            targetAmount: numAmount,
            currency,
        });

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                label="Goal Name"
                placeholder="e.g. Trip to Japan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
            />

            <div className="flex gap-4">
                <div className="flex-1">
                    <Input
                        label="Target Amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="w-1/3">
                    <Select
                        label="Currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                    >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                    </Select>
                </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    Create Goal
                </Button>
            </div>
        </form>
    );
}
