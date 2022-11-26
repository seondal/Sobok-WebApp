interface ScehduleCalendar {
  scheduleDate: Date;
  scheduleCount: number;
  isCheckCount: number;
  isComplete: string;
}

interface Schedule {
  scheduleId: number;
  pillId: number;
  pillName: string;
  isCheck: boolean;
  color: number;
  stickerId: number[];
  stickerTotalCount: number;
}

export interface ScheduleDetail {
  scheduleTime: string;
  scheduleList: Schedule[];
}
