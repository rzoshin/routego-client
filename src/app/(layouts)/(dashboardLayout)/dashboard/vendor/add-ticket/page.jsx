import AddTicketForm from "./AddTicketForm";
import { getUser } from "@/lib/api/session";
import { getUserProfile } from "@/lib/api/users/data";

const AddTicketPage = async () => {
  const user = await getUser();
  const profileResult = await getUserProfile(user.email);
  const profile = profileResult?.message ? null : profileResult;

  return <AddTicketForm isFraud={Boolean(profile?.isFraud)} />;
};

export default AddTicketPage;
