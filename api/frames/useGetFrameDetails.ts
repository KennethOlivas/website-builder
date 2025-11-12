import {
  getProjectFrameDetailsSchema,
  getProjectFrameDetailsSchemaType,
} from "@/schema/queries/getProjectFrameDetailsSchema";
import { useQuery } from "@tanstack/react-query";


type Params = {
  frameId: string;
  projectId: string;
};

const useGetFrameDetails = (params: Params) => {
  const query = useQuery<getProjectFrameDetailsSchemaType>({
    queryKey: ["frameDetails", params],
    queryFn: async () => {
      // fetch to /api/frames/
      const response = await fetch(
        `/api/frames?frameId=${params.frameId}&projectId=${params.projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return getProjectFrameDetailsSchema.parseAsync(await response.json());
    },
    enabled: !!params.frameId,
  });
  return query;
};
export default useGetFrameDetails;
