import { ProjectStatus } from "./project.type";
export const PROJECT_STATUS_CONFIG = {
  [ProjectStatus.Active]: {
    label: 'Active',
    color: 'from-emerald-400 to-green-500',
    description: 'Clear skies'
  },
  [ProjectStatus.InProgress]: {
    label: 'In Progress',
    color: 'from-amber-400 to-orange-500',
    description: 'Partly cloudy'
  },
  [ProjectStatus.Legacy]: {
    label: 'Legacy',
    color: 'from-slate-400 to-gray-500',
    description: 'Settled layers'
  },
  [ProjectStatus.Completed]: {
    label: 'Completed',
    color: 'from-blue-400 to-indigo-500',
    description: 'Calm atmosphere'
  }
};