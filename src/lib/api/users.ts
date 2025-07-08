export interface CurrentUser {
    authenticated: boolean;
    username: string;
    name: string;
    email: string;
    avatar: string;
}

export async function fetchCurrentUser(): Promise<CurrentUser | null> {
    try {
        const response = await fetch("http://localhost:8081/api/users/me", {
            credentials: "include",
        });

        if (response.status === 401 || response.status === 403) {
            return null;
        }

        if (!response.ok) {
            console.error("Unexpected error:", response.statusText);
            return null;
        }

        const data: CurrentUser = await response.json();
        return data.authenticated ? data : null;
    } catch (err) {
        console.error("Error fetching user:", err);
        return null;
    }
}

export function logoutUser() {
    window.location.href = "http://localhost:8081/logout";
}

export function getLoginUrl(): string {
    const currentPath = window.location.pathname;
    return `http://localhost:8081/auth/login/oauth2?redirectUrl=${encodeURIComponent(currentPath)}`;
}

export async function deleteUserAccount(): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:8081/api/users/delete", {
            method: "DELETE",
            credentials: "include",
        });

        return response.ok;
    } catch (err) {
        console.error("Delete account failed:", err);
        return false;
    }
}
