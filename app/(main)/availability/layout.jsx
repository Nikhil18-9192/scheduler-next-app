import { Suspense } from "react";


export default function AvailablityLayout({children}){
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </div>
    )
}