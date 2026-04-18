import { EPriority, EStatus } from "../types/enums"

export function getStatusColor(status: EStatus): string {
    switch (status) {
        case EStatus.INPROCESS: return "info"
        case EStatus.ACCEPTED: return "success"
        case EStatus.DECLINED: return "error"
        case EStatus.DRAFT: return "warning"
    }
}

export function getPriorityColor(priority: EPriority): string {
    switch (priority) {
        case EPriority.HIGH: return "warning"
        case EPriority.USUAL: return "info"
    }
}