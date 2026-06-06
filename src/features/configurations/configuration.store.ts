import { create } from "zustand";

type ConfigurationStore = {
    configurationId: number | null;
    currentStep: number;

    setConfigurationId: (id: number | null) => void;
    setCurrentStep: (step: number) => void;

    reset: () => void;
};

export const useConfigurationStore =
    create<ConfigurationStore>((set) => ({
        configurationId: null,
        currentStep: 1,

        setConfigurationId: (id) =>
            set({ configurationId: id }),

        setCurrentStep: (step) =>
            set({ currentStep: step }),

        reset: () =>
            set({
                configurationId: null,
                currentStep: 1,
            }),
    }));