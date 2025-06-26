import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/Bookings/BookingTable";
import BookingTableOperations from "../features/Bookings/BookingTableOperations";
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations/>
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
