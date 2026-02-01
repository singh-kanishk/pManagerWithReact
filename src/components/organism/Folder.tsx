import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormLabel from "../atoms/FormLabel";
import Button from "../atoms/Button";

interface FolderType {
    id: number;
    folderName: string;
}

interface FolderFormData {
    folderName: string;
}

function Folder() {
    const [folders, setFolders] = useState<FolderType[]>([]);
    const methods = useForm<FolderFormData>();

    const fetchFolders = async () => {
        try {
            const response = await fetch("http://localhost:2995/api/folders");
            if (response.ok) {
                const result = await response.json();
                setFolders(result.data || []);
            } else {
                console.error("Failed to fetch folders");
            }
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const onSubmit = async (data: FolderFormData) => {
        if (!data.folderName.trim()) return;

        try {
            const response = await fetch("http://localhost:2995/api/folders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ folderName: data.folderName }),
            });

            if (response.ok) {
                methods.reset();
                fetchFolders();
            } else {
                console.error("Failed to create folder");
            }
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    };

    return (
        <aside className="w-full h-full bg-gray-50 border-r border-gray-200 p-4 flex flex-col">
            <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Folders</h3>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex items-end gap-2 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex-grow">
                            <FormLabel
                                name="folderName"
                                label="New Folder"
                                type="text"
                                validator={{ required: "*" }}
                            />
                        </div>
                        <div className="mb-1">
                            <Button
                                name=""
                                typeOfButton="submit"
                                width="40px"
                                height="40px"
                                buttonClassName="fi fi-rr-add text-blue-600"
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ul className="space-y-1">
                    {folders.map((folder) => (
                        <li key={folder.id} className="group flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-sm hover:border-gray-100 border border-transparent transition-all cursor-pointer text-gray-700 hover:text-blue-600">
                            <span className="font-medium text-sm">{folder.folderName}</span>
                            <i className="fi fi-rr-angle-small-right opacity-0 group-hover:opacity-100 transition-opacity text-gray-400"></i>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Folder;