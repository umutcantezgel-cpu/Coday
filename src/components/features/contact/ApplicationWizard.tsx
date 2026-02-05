import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react'; // Check if framer-motion or motion/react is used. Previous file used framer-motion.
import Magnet from '../../../shared/ui/Magnet';
import { SuccessModal } from '../../../shared/ui/SuccessModal';
import { createClient } from '@supabase/supabase-js';

// Init Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import { useTranslation } from 'react-i18next';
import { ContactFormSchema } from '../../../shared/lib/validation/schemas';
import { z } from 'zod';
import { logValidationFailure } from '../../../shared/lib/security/logger';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

const ApplicationWizard: React.FC = () => {
    const { t } = useTranslation('contact');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        scope: '',
        budget: '',
        timeline: '',
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const updateData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // Validate data
            // We map the state to the schema structure
            const payload = {
                name: formData.name,
                email: formData.email,
                project: formData.scope,
                budget: formData.budget,
                timeline: formData.timeline,
                message: formData.message
            };

            // This will throw if validation fails
            const validatedData = ContactFormSchema.parse(payload);

            const { error } = await supabase.from('leads').insert({
                project: validatedData.project,
                budget: validatedData.budget,
                timeline: validatedData.timeline,
                name: validatedData.name,
                email: validatedData.email,
                message: validatedData.message,
                source: 'wizard'
            });

            if (error) throw error;

            setShowSuccess(true);
            setStep(1); // Reset
            setFormData({ scope: '', budget: '', timeline: '', name: '', email: '', message: '' });
        } catch (err) {
            console.error('Application error:', err);

            if (err instanceof z.ZodError) {
                // Log security event
                const zodErrors = (err as any).errors;
                logValidationFailure(
                    'ApplicationWizard',
                    zodErrors.map((e: any) => ({ path: String(e.path[0]), message: e.message }))
                );

                // Format Zod errors for alert
                const errorMessages = zodErrors.map((e: any) => `${e.path[0]}: ${e.message}`).join('\n');
                alert(`Please fix the following errors:\n${errorMessages}`);
            } else {
                alert('Error sending application. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 min-h-[500px] flex flex-col relative overflow-hidden">

            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title={t('wizard.success.title')}
                message={t('wizard.success.message')}
            />

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100">
                <motion.div
                    className="h-full bg-primary"
                    animate={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <h3 className="text-2xl font-bold text-secondary mb-8">{t('wizard.step1.title')}</h3>
                        <div className="grid gap-4">
                            {(t('wizard.step1.options', { returnObjects: true }) as string[]).map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => { updateData('scope', opt); handleNext(); }}
                                    className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 text-left font-bold text-slate-700 transition-all flex justify-between items-center group"
                                >
                                    {opt}
                                    <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">arrow_forward</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <button onClick={handleBack} className="text-sm text-gray-400 mb-6 flex items-center gap-1 hover:text-secondary"><span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_back</span> {t('wizard.back')}</button>
                        <h3 className="text-2xl font-bold text-secondary mb-8">{t('wizard.step2.title')}</h3>
                        <div className="grid gap-4">
                            {(t('wizard.step2.options', { returnObjects: true }) as string[]).map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => { updateData('budget', opt); handleNext(); }}
                                    className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 text-left font-bold text-slate-700 transition-all flex justify-between items-center group"
                                >
                                    {opt}
                                    <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">arrow_forward</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <button onClick={handleBack} className="text-sm text-gray-400 mb-6 flex items-center gap-1 hover:text-secondary"><span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_back</span> {t('wizard.back')}</button>
                        <h3 className="text-2xl font-bold text-secondary mb-8">{t('wizard.step3.title')}</h3>
                        <div className="grid gap-4">
                            {(t('wizard.step3.options', { returnObjects: true }) as string[]).map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => { updateData('timeline', opt); handleNext(); }}
                                    className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 text-left font-bold text-slate-700 transition-all flex justify-between items-center group"
                                >
                                    {opt}
                                    <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">arrow_forward</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <button onClick={handleBack} className="text-sm text-gray-400 mb-6 flex items-center gap-1 hover:text-secondary"><span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_back</span> {t('wizard.back')}</button>
                        <h3 className="text-2xl font-bold text-secondary mb-6">{t('wizard.step4.title')}</h3>

                        <Input
                            label={t('wizard.step4.name_placeholder')}
                            placeholder="Max Mustermann"
                            autoComplete="name"
                            value={formData.name}
                            onChange={(e) => updateData('name', e.target.value)}
                        />
                        <Input
                            type="email"
                            inputmode="email"
                            label={t('wizard.step4.email_placeholder')}
                            placeholder="max@firma.de"
                            autoComplete="email"
                            value={formData.email}
                            onChange={(e) => updateData('email', e.target.value)}
                        />
                        <textarea
                            placeholder={t('wizard.step4.message_placeholder')}
                            rows={3}
                            className="w-full p-4 bg-white rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none resize-none text-base"
                            value={formData.message}
                            onChange={(e) => updateData('message', e.target.value)}
                        />

                        <Magnet padding={50} magnetStrength={0.2}>
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                isLoading={loading}
                                className="w-full shadow-lg"
                                size="lg"
                                rightIcon={<span className="material-symbols-outlined rtl:rotate-180">send</span>}
                            >
                                {t('wizard.step4.submit')}
                            </Button>
                        </Magnet>
                    </div>
                    </motion.div>
                )}
        </AnimatePresence>
        </div >
    );
};

export default ApplicationWizard;
