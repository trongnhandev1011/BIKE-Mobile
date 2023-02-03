import { Moment } from "moment";

export const addTimetoStartDate = (date: Moment, timeToAdd: Moment) => {
  return date
    .startOf("date")
    .add(timeToAdd.get("hour"), "hour")
    .add(timeToAdd.get("minute"), "minute")
    .add(timeToAdd.get("second"), "second")
    .add(timeToAdd.get("millisecond"), "millisecond");
};
