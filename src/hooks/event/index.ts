import { useQuery } from "@tanstack/react-query";
import { handleApiGetEvent, handleApiGetEventDetail } from "../../apis";
import { QueryParamsGetEvent } from "../../apis/event";

export const useGetEvents = ({
  page = 1,
  limit = 5,
  search = "",
  status = undefined,
  startTime = undefined,
  endTime = undefined,
  eventCatId = undefined,
}: QueryParamsGetEvent) => {
  return useQuery({
    queryKey: [
      "events",
      page,
      limit,
      search,
      status,
      startTime,
      endTime,
      eventCatId,
    ],
    queryFn: () =>
      handleApiGetEvent({
        page,
        limit,
        search,
        status,
        startTime,
        endTime,
        eventCatId,
      }),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetEventDetail = (EventCode: string) => {
  return useQuery({
    queryKey: ["event-details", EventCode],
    queryFn: async () => {
      const response = await handleApiGetEventDetail(EventCode);

      console.log(response);
      return response?.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!EventCode,
  });
};
