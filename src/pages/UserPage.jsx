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
            <h1 className="text-2xl font-bold">
                User Management
            </h1>

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    User Management
                </h1>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                    + Add User
                </button>
                </div>

            <input
                type="text"
                placeholder="Search user..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                className="w-full rounded border p-2"
            />

            <div className="overflow-x-auto rounded-lg border bg-white">
                <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">
                            Name
                        </th>

                        <th className="p-3 text-left">
                            Email
                        </th>

                        <th className="p-3 text-left">
                            Role
                        </th>

                        <th className="p-3 text-left">
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
                                    className="border-t"
                                >
                                    <td className="p-3">
                                        {user.name}
                                    </td>

                                    <td className="p-3">
                                        {user.email}
                                    </td>

                                    <td className="p-3 capitalize">
                                        {user.role}
                                    </td>

                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(user)
                                                }
                                                className="rounded bg-yellow-500 px-3 py-1 text-white"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDeleteUser(user)
                                                }
                                                className="rounded bg-red-500 px-3 py-1 text-white"
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

            <div className="flex gap-2">
                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage((prev) => prev - 1)
                    }
                    className="rounded border px-3 py-2"
                >
                    Prev
                </button>

                <span className="px-2 py-2">
                    {pagination.current_page} /{" "}
                    {pagination.last_page}
                </span>

                <button
                    disabled={
                        page === pagination.last_page
                    }
                    onClick={() =>
                        setPage((prev) => prev + 1)
                    }
                    className="rounded border px-3 py-2"
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