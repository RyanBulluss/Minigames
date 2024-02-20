import { checkToken } from "../utilities/users-service"

export default function OrderHistoryPage() {

    async function handleCheckToken() {
        const expDate = await checkToken();
        console.log(expDate)
    }

    return (
        <>
            <h1 className="text-4xl m-8 font-bold">Order History Page</h1>
            <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </>
    )
}