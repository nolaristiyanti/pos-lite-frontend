import { useEffect, useState } from "react";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from "../api/userApi";

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "cashier",
    });

    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: "cashier",
    });

    const [searchInput, setSearchInput] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const response = await getUsers({
                page,
                search,
            });

            setUsers(response.data.data.data);

            setPagination({
                current_page: response.data.data.current_page,
                last_page: response.data.data.last_page,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search]);

    const handleSearch = () => {
        setSearch(searchInput);
        setPage(1);
      };

    const handleCreateUser = async (e) => {
        e.preventDefault();
      
        try {
          await createUser(formData);
      
          setShowCreateModal(false);
      
          setFormData({
            name: "",
            email: "",
            password: "",
            role: "cashier",
          });
      
          fetchUsers();
        } catch (error) {
          console.error(error);
        }
      };
    
    const handleEditClick = (user) => {
        setSelectedUser(user);
        
        setEditForm({
            name: user.name,
            email: user.email,
            role: user.role,
        });
        
        setShowEditModal(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
      
        try {
          await updateUser(
            selectedUser.id,
            editForm
          );
      
          setShowEditModal(false);
      
          fetchUsers();
        } catch (error) {
          console.error(error);
        }
      };

    const handleDeleteUser = async (user) => {
        const confirmed = window.confirm(
            `Delete ${user.name}?`
        );
    
        if (!confirmed) return;
    
        try {
            await deleteUser(user.id);
    
            fetchUsers();
        } catch (error) {
            console.error(error);
    
            alert(
                error?.response?.data?.message ||
                "Failed to delete user"
            );
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold tracking-tight text-[#18181B]">
                    User Management
                </h1>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="
                        rounded-2xl
                        bg-[#8B5A3C]
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        shadow-sm
                        transition-all
                        hover:bg-[#72452B]
                        "
                >
                    + Add User
                </button>
                </div>

                <div
                    className="
                        rounded-3xl
                        border
                        border-[#ECE7E3]
                        bg-white
                        p-4
                        shadow-sm
                    "
                    >
                    <div className="flex flex-col gap-3 md:flex-row">
                        <input
                        type="text"
                        placeholder="Search users..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            handleSearch();
                            }
                        }}
                        className="
                            flex-1
                            rounded-2xl
                            border
                            border-[#ECE7E3]
                            px-4
                            py-2.5
                            outline-none
                            transition
                            focus:border-[#8B5A3C]
                        "
                        />

                        <button
                        onClick={handleSearch}
                        className="
                            rounded-2xl
                            bg-[#8B5A3C]
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition-all
                            hover:bg-[#72452B]
                        "
                        >
                        Search
                        </button>
                    </div>
                </div>

                <div
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[#ECE7E3]
                    bg-white
                    shadow-sm
                "
                >
                <div className="overflow-x-auto">
                <table className="w-full">
                <thead>
                <tr
                    className="
                        bg-[#FAF6F2]
                        text-[#71717A]
                    "
                >
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                            Name
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                            Email
                        </th>

                        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                            Role
                        </th>

                        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#71717A]">
                            Actions
                        </th>
                    </tr>
                </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="p-4 text-center"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="
                                        border-t
                                        border-[#F1EEEB]
                                        transition-colors
                                        hover:bg-[#FCFBFA]
                                    "
                                >
                                    <td className="px-6 py-4">
                                        {user.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`
                                            inline-flex
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-medium
                                            ${
                                                user.role === "admin"
                                                ? "bg-[#FAF6F2] text-[#8B5A3C]"
                                                : "bg-blue-50 text-blue-700"
                                            }
                                            `}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(user)
                                                }
                                                className="
                                                rounded-xl
                                                bg-[#FAF6F2]
                                                px-3
                                                py-2
                                                text-sm
                                                font-medium
                                                text-[#8B5A3C]
                                                transition
                                                hover:bg-[#F3ECE7]
                                              "
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDeleteUser(user)
                                                }
                                                className="
                                                rounded-xl
                                                bg-red-50
                                                px-3
                                                py-2
                                                text-sm
                                                font-medium
                                                text-red-600
                                                transition
                                                hover:bg-red-100
                                                "
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3">
                <button
                    disabled={page === 1}
                    onClick={() =>
                    setPage((prev) => prev - 1)
                    }
                    className="
                    rounded-xl
                    border
                    border-[#ECE7E3]
                    bg-white
                    px-4
                    py-2
                    text-sm
                    disabled:opacity-50
                    "
                >
                    Previous
                </button>

                <div
                    className="
                    rounded-xl
                    bg-[#FAF6F2]
                    px-4
                    py-2
                    text-sm
                    text-[#8B5A3C]
                    "
                >
                    Page {pagination.current_page} of{" "}
                    {pagination.last_page}
                </div>

                <button
                    disabled={
                    page === pagination.last_page
                    }
                    onClick={() =>
                    setPage((prev) => prev + 1)
                    }
                    className="
                    rounded-xl
                    border
                    border-[#ECE7E3]
                    bg-white
                    px-4
                    py-2
                    text-sm
                    disabled:opacity-50
                    "
                >
                    Next
                </button>
            </div>

            {
                showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">
                        Create User
                        </h2>

                        <form
                        onSubmit={handleCreateUser}
                        className="space-y-4"
                        >
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                            }
                            className="w-full rounded border p-2"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                            }
                            className="w-full rounded border p-2"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                            }
                            className="w-full rounded border p-2"
                            required
                        />

                        <select
                            value={formData.role}
                            onChange={(e) =>
                            setFormData({
                                ...formData,
                                role: e.target.value,
                            })
                            }
                            className="w-full rounded border p-2"
                        >
                            <option value="cashier">
                            Cashier
                            </option>

                            <option value="admin">
                            Admin
                            </option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <button
                            type="button"
                            onClick={() =>
                                setShowCreateModal(false)
                            }
                            className="rounded border px-4 py-2"
                            >
                            Cancel
                            </button>

                            <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 text-white"
                            >
                            Save
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                )
            }

            {
                showEditModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="w-full max-w-md rounded-lg bg-white p-6">
                            <h2 className="mb-4 text-xl font-bold">
                                Edit User
                            </h2>

                            <form
                                onSubmit={handleUpdateUser}
                                className="space-y-4"
                            >
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded border p-2"
                                    required
                                />

                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded border p-2"
                                    required
                                />

                                <select
                                    value={editForm.role}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            role: e.target.value,
                                        })
                                    }
                                    className="w-full rounded border p-2"
                                >
                                    <option value="cashier">
                                        Cashier
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>
                                </select>

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowEditModal(false)
                                        }
                                        className="rounded border px-4 py-2"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded bg-blue-600 px-4 py-2 text-white"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
}