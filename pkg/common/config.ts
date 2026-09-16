import type { IPlugin } from '@shell/core/types';

export function registerCommonL10n(plugin: IPlugin): void {
  plugin.addL10n('en-us', () => Promise.resolve(require('./l10n/en-us.yaml')));
}