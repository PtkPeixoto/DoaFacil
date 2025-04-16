import api from "./api";

const getDonations = async () => {
    console.log("Fetching donations...");
    const donations = await api.get("/donations");
    
    console.log({donations});
    if (donations.status === 200) {
        console.log("Donations fetched successfully!");
        return donations.data;
    } else {
        throw new Error("Failed to fetch donations");
    }
}

export { getDonations };