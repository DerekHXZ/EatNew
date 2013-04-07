from foursquare import Foursquare

base_url="http://localhost:5000"

def makeClient():
    return Foursquare(client_id = "ATQBBI1MMQJCTD43UXTO5IXK0CXPUPCUH5M4DZWOS1LL3013",
            client_secret = "L5T1HRSW2LYUQTNCSF12PZXA1TVT2HZDSD5Y4ZCPBPEIQ1RI",
            redirect_uri = base_url + "/login")

