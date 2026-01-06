'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { GoalList } from '@/components/dashboard/GoalList';
import { Button } from '@/components/ui/primitives';
import { Plus, Target } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { AddGoalForm } from '@/components/dashboard/AddGoalForm';

export default function Home() {
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand/10 text-brand mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Syfe Savings Planner</h1>
          <p className="text-gray-500 max-w-lg mx-auto">Track your financial goals and build your future</p>
        </div>

        {/* Dashboard Stats */}
        <DashboardHeader />

        {/* Actions & List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Goals</h2>
            <Button onClick={() => setIsAddGoalOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Goal
            </Button>
          </div>

          <GoalList />
        </div>
      </div>

      <Modal
        isOpen={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
        title="Create New Goal"
      >
        <AddGoalForm
          onSuccess={() => setIsAddGoalOpen(false)}
          onCancel={() => setIsAddGoalOpen(false)}
        />
      </Modal>
    </main>
  );
}
