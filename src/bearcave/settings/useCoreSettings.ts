// Deps
import React, { useState, useEffect, ReactElement } from "react";
// Locals
import { useStidContext, defaultSettings, StidSettings } from "../core/StidContext";

type SetStidSetting = <T>(key: string, value: T) => void;
type StidSettingsHook = [StidSettings, SetStidSetting];

export default function useCoreSettings(): StidSettingsHook {
    const { settings } = useStidContext();

    const [stidSettings, setStidSettings] = useState<StidSettings>(settings.core.toObject() || defaultSettings);

    // TODO: fix setstate on unmounted components.
    useEffect(() => {
        let didCancel = false;

        const listener = settings.core.on("change", (stidSettings: StidSettings) => {
            if (!didCancel) setStidSettings(stidSettings);
        });

        return () => {
            didCancel = true;
            listener.unsubscribe();
        };
    }, []);

    // TODO: fix somethingsomething types
    const setSettingsAsync: SetStidSetting = async <T>(key: string, value: T): Promise<void> => {
        await settings.core.setAsync(key, value);
        // const newSettings = await settings.toObjectAsync();
        // setStidSettings(newSettings);
    };

    return [stidSettings, setSettingsAsync];
}

type CoreSettingsWrapperProps = {
    children: ReactElement;
};
export const CoreSettingsWrapper: React.FC<CoreSettingsWrapperProps> = ({ children }) => {
    const [settings, setSettings] = useCoreSettings();

    function updateSettings<T>(key: string, value: T): void {
        setSettings(key, value);
    }

    return React.cloneElement(children, {
        ...children.props,
        settings,
        updateSettings,
    });
};
