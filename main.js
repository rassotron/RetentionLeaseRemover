require("./config/config");
const { getAllBuilds, getBuildLeases, deleteBuildLease } = require('./services/azure');

const app = async () => {

    const builds = await getAllBuilds();
    console.log("build " + builds.id);
    builds.forEach( async build => {
        if(build.retainedByRelease) {
            const leases = await getBuildLeases(build.id);
            console.log("build found");
            leases.forEach(async lease => {
                if(lease.protectPipeline === true) await deleteBuildLease(lease.leaseId);
                
            });
        }
        else {
            console.log("No retained leases found");
        }
    });

    console.log('Protect pipeline retention leases deleted successfully');
}

app();

