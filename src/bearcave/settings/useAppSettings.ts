// Deps
import React, { useState, useEffect, ReactElement } from "react";
// Locals
import SettingsContainer, { Settings } from "./SettingsContainer";
import { useStidContext } from "../core/StidContext";

type SetAppSetting = <T>(key: string, value: T) => void;
type AppSettingsHook = [Settings, SetAppSetting];

const ensureAppSettings = <T>(settings: Settings, appKey: string, defaultSettings?: T): SettingsContainer => {
    // dynamically provide settings (if there are none for current app)
    if (typeof settings.apps[appKey] === "undefined") {
        const appSettings = new SettingsContainer<T>(appKey, defaultSettings);
        settings.apps[appKey] = appSettings;
        return appSettings;
    }

    return settings.apps[appKey];
};

export default function useAppSettings<T>(appKey: string, defaultSettings?: T): AppSettingsHook {
    const { settings } = useStidContext();

    const currentApp = appKey;

    let appSettings = ensureAppSettings<T>(settings, currentApp, defaultSettings);

    const [localAppSettings, setLocalAppSettings] = useState<Settings>(appSettings.toObject() || {});

    useEffect(() => {
        let didCancel = false;

        const listener = appSettings.on("change", (settings: Settings) => {
            if (!didCancel) setLocalAppSettings(settings);
        });
        return () => {
            didCancel = true;
            listener.unsubscribe();
        };
    }, []);

    const setLocalAppSettingsAsync: SetAppSetting = async <T>(key: string, value: T): Promise<void> => {
        await appSettings.setAsync(key, value);
        const newSettings = await appSettings.toObjectAsync();
        setLocalAppSettings(newSettings);
    };

    return [localAppSettings, setLocalAppSettingsAsync];
}

type AppSettignsWrapperProps = {
    appKey: string;
    defaultSettings?: Settings;
    children: ReactElement;
};
export const AppSettingsWrapper: React.FC<AppSettignsWrapperProps> = ({ appKey, defaultSettings, children }) => {
    const [appSettings, setAppSettings] = useAppSettings(appKey, defaultSettings);

    function updateSettings<T>(key: string, value: T): void {
        setAppSettings(key, value);
    }

    return React.cloneElement(children, {
        ...children.props,
        appSettings,
        updateSettings,
    });
};
