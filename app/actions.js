'use server'

export const followVendor = async (vendorId) => {
    console.log("Hello")
    const follow = await fetch("/api/follower", { method : "POST", body : { vendorId : vendorId }});
    console.log(follow.json);
    revalidatePath("/[storeId]");
}