export class OperationTechnicianList {
  id: number;
  scheduleType: string;
  shiftType: string;
  workstationName: string;
  workstationStatus: string;
  parts: Parts_Operation;
  startDate: string;
  endDate: string;
}

export class Parts_Operation {
  id: number
  name: string;
}

