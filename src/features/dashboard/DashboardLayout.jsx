import styled from "styled-components";
import { useRecentBookings } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading: isBookings } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isCabins } = useCabins();
  if (isBookings || isStays || isCabins) return <Spinner />;
  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Statistics</div>
      <div>number</div>
      <div>cahar</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
