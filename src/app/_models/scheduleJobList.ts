export class ScheduleJobList {
  id: number;
  scheduleType: string;
  shiftType: string;
  workstationName: string;
  parts: Parts;
  startDate: string;
  endDate: string;
  requiredQuantity: number;
}

export class Parts {
  id: number
  name: string;
  comply:number;
  not_comply:number;
  file_url: string;
}

