import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useEffect, useState } from "react";
import { Users } from "../../utils/apis/admin/users/types";
import { getUsers } from "../../utils/apis/admin/users/api";

const AdminUsers = () => {
  const [user, setUser] = useState<Users[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchUsers(pageNumber, 10);
  }, [pageNumber]);

  const fetchUsers = async (pageNumber: number, limit: number) => {
    try {
      const result = await getUsers(pageNumber, limit);
      setUser(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*  const totalPages = Math.ceil(user.length / limit);
  const startIndex = (pageNumber - 1) * limit;
  const endIndex = startIndex + limit;
  const currentItems = user.slice(startIndex, endIndex); */

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
    console.log(pageNumber);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      console.log(pageNumber);
    }
  };

  return (
    <AdminLayout>
      <div className="my-5 font-bold font text-3xl pl-4">Users</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-left">User ID</TableHead>
            <TableHead className="">Avatar</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-center">Username</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user &&
            user.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">{user.id}</TableCell>
                <TableCell className="font-medium text-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.photo_profile || "https://via.placeholder.com/150"}
                  />
                </TableCell>
                <TableCell className="text-left">{user.name}</TableCell>
                <TableCell className="text-center">{user.user_name}</TableCell>
                <TableCell className="text-left">{user.email}</TableCell>
                <TableCell className="text-left font-semibold">
                  {user.status_user.toUpperCase()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination className="py-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={handlePreviousPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="cursor-default">{pageNumber}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  );
};

export default AdminUsers;
