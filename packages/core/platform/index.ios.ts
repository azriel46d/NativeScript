﻿/* tslint:disable:class-name */

import { platformNames } from './common';

export * from './common';

class DeviceRef {
	private _model: string;
	private _osVersion: string;
	private _sdkVersion: string;
	private _deviceType: 'Phone' | 'Tablet';

	get manufacturer(): string {
		return 'Apple';
	}

	get os(): string {
		return platformNames.ios;
	}

	get osVersion(): string {
		if (!this._osVersion) {
			this._osVersion = UIDevice.currentDevice.systemVersion;
		}

		return this._osVersion;
	}

	get model(): string {
		if (!this._model) {
			this._model = UIDevice.currentDevice.model;
		}

		return this._model;
	}

	get sdkVersion(): string {
		if (!this._sdkVersion) {
			this._sdkVersion = UIDevice.currentDevice.systemVersion;
		}

		return this._sdkVersion;
	}

	get deviceType(): 'Phone' | 'Tablet' {
		if (!this._deviceType) {
			if (UIDevice.currentDevice.userInterfaceIdiom === UIUserInterfaceIdiom.Phone) {
				this._deviceType = 'Phone';
			} else {
				this._deviceType = 'Tablet';
			}
		}

		return this._deviceType;
	}

	get uuid(): string {
		const userDefaults = NSUserDefaults.standardUserDefaults;
		const uuid_key = 'TNSUUID';
		let app_uuid = userDefaults.stringForKey(uuid_key);

		if (!app_uuid) {
			app_uuid = NSUUID.UUID().UUIDString;
			userDefaults.setObjectForKey(app_uuid, uuid_key);
			userDefaults.synchronize();
		}

		return app_uuid;
	}

	get language(): string {
		return NSLocale.preferredLanguages[0];
	}

	get region(): string {
		return NSLocale.currentLocale.objectForKey(NSLocaleCountryCode);
	}
}

class MainScreen {
	private _screen: UIScreen;

	private get screen(): UIScreen {
		if (!this._screen) {
			this._screen = UIScreen.mainScreen;
		}

		return this._screen;
	}

	get widthPixels(): number {
		return this.widthDIPs * this.scale;
	}
	get heightPixels(): number {
		return this.heightDIPs * this.scale;
	}
	get scale(): number {
		return this.screen.scale;
	}
	get widthDIPs(): number {
		return this.screen.bounds.size.width;
	}
	get heightDIPs(): number {
		return this.screen.bounds.size.height;
	}
}

export const Device = new DeviceRef();

// This retains compatibility with NS6
export const device = Device;

export class Screen {
	static mainScreen = new MainScreen();
}

// This retains compatibility with NS6
export const screen = Screen;
