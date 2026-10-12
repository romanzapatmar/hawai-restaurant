import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8001";

function AdminTables() {
    const [tables, setTables] = useState([]);
    const [tableNumber, setTableNumber] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const loadTables = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tables/`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Could not load tables");
            }

            setTables(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        loadTables();
    }, []);

    const addTable = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/tables/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    table_number: Number(tableNumber)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Could not add table");
            }

            setMessage(`Table ${data.table_number} added successfully.`);
            setTableNumber("");
            await loadTables();
        } catch (err) {
            setError(err.message);
        }
    };

    const deactivateTable = async (id, number) => {
        if (!window.confirm(`Deactivate Table ${number}?`)) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/tables/${id}/deactivate`,
                { method: "PATCH" }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Could not deactivate table");
            }

            await loadTables();
        } catch (err) {
            setError(err.message);
        }
    };

    const copyUrl = async (path) => {
        const fullUrl = `${window.location.origin}${path}`;
        try {
            await navigator.clipboard.writeText(fullUrl);
            setMessage("Table URL copied.");
        } catch {
            setMessage(fullUrl);
        }
    };

    return (
        <div className="admin-content">
            <div className="admin-header">
                <div>
                    <h1>Manage Tables</h1>
                    <p>Add restaurant tables and copy their unique URLs.</p>
                </div>
            </div>

            {error && <p className="contact-error">{error}</p>}
            {message && <p className="contact-success">{message}</p>}

            <form onSubmit={addTable} className="admin-table-add-form">
                <label htmlFor="table-number">Table number</label>
                <input
                    id="table-number"
                    type="number"
                    min="1"
                    required
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. 4"
                />
                <button type="submit">Add Table</button>
            </form>

            <div className="admin-section">
                <h2>Restaurant Tables</h2>

                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Table</th>
                                <th>Status</th>
                                <th>Unique URL</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tables.map((table) => (
                                <tr key={table.id}>
                                    <td>Table {table.table_number}</td>
                                    <td>
                                        {table.is_active ? "Active" : "Inactive"}
                                    </td>
                                    <td>
                                        <code>{table.url_path}</code>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => copyUrl(table.url_path)}
                                        >
                                            Copy URL
                                        </button>

                                        {table.is_active && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deactivateTable(
                                                        table.id,
                                                        table.table_number
                                                    )
                                                }
                                            >
                                                Deactivate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {tables.length === 0 && (
                                <tr>
                                    <td colSpan="4">No tables added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminTables;
