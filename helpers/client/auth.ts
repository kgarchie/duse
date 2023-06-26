export async function assertIsAuthenticated(){
}

export async function assertIsAdmin(){
    await assertIsAuthenticated();
}