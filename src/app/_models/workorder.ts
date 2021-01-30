export class WorkOrder {
  id: number;
  wo_name: string;
  wo_type_id: number;
  equipment_id: number;
  asignee_user_id: number;
  wo_priority_id: number;
  notification_id: number;
  remarks: string;
  dt_start_planned: string;
  dt_end_planned: string;
  timeFrom: string;
  timeTo: string;
}
