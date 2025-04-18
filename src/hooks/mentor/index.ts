import { useQuery } from "@tanstack/react-query";
import { handleApiGetMentorAll, handleApiMentorRandom } from "../../apis";
import { QueryParamsGet } from "../../types";

export const useMentor = () => {
  const getMentorRandom = async () => {
    try {
      const response = await handleApiMentorRandom();
      return response;
    } catch (error) {
      console.error("error", error);
    }
  };

  const getMentorAll = async ({
    page,
    // limit,
    // search,
  }: QueryParamsGet) => {
    try {
      const response = await handleApiGetMentorAll({ page }); //limit, search
      return response;
    } catch (error) {
      console.error("error", error);
    }
  };

  return { getMentorRandom, getMentorAll };
};

export const useGetAllMentor = ({ page = 1, search = "" }: QueryParamsGet) => {
  return useQuery({
    queryKey: ["mentors", page, search],
    queryFn: () => handleApiGetMentorAll({ page, search }),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
