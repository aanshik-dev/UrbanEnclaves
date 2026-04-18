{
  "data": [
    {
      "tokenId": 10000046,
      "listingDate": "2017-06-05",
      "listingType": "RENT",
      "price": 69000.0,
      "description": "Affordable studio for rent",
      "status": "ACTIVE",
      "property": {
        "propertyId": 50000034,
        "houseNo": "J-465",
        "description": "Premium 5 BHK APARTMENT in Colaba, Mumbai. Built in 2014 with 1962 sq ft area.",
        "locality": "Powai",
        "area": "Colaba",
        "city": "Mumbai",
        "pin": 400001,
        "size": 1962.0,
        "type": "APARTMENT",
        "BHK": 5
      },
      "agent": null,
      "owner": {
        "name": "Aditya Sharma",
        "phone": "9812345601",
        "profileUrl": "https://randomuser.me/api/portraits/men/24.jpg"
      }
    },
    {
      "tokenId": 10000097,
      "listingDate": "2016-10-05",
      "listingType": "SELL",
      "price": 2.35E7,
      "description": "Spacious property for sale",
      "status": "INACTIVE",
      "property": {
        "propertyId": 50000034,
        "houseNo": "J-465",
        "description": "Premium 5 BHK APARTMENT in Colaba, Mumbai. Built in 2014 with 1962 sq ft area.",
        "locality": "Powai",
        "area": "Colaba",
        "city": "Mumbai",
        "pin": 400001,
        "size": 1962.0,
        "type": "APARTMENT",
        "BHK": 5
      },
      "agent": {
        "name": "Rekha Desai",
        "phone": "6063154143",
        "profileUrl": "https://randomuser.me/api/portraits/women/40.jpg",
        "userRating": "1.9"
      },
      "owner": {
        "name": "Aditya Sharma",
        "phone": "9812345601",
        "profileUrl": "https://randomuser.me/api/portraits/men/24.jpg"
      }
    },
    {
      "tokenId": 10000031,
      "listingDate": "2022-01-24",
      "listingType": "RENT",
      "price": 48000.0,
      "description": "Affordable studio for rent",
      "status": "INACTIVE",
      "property": {
        "propertyId": 50000145,
        "houseNo": "Q-110",
        "description": "Premium 1 BHK APARTMENT in Paltan Bazaar, Guwahati. Built in 2021 with 2379 sq ft area.",
        "locality": "Dispur",
        "area": "Paltan Bazaar",
        "city": "Guwahati",
        "pin": 781001,
        "size": 2379.0,
        "type": "APARTMENT",
        "BHK": 1
      },
      "agent": {
        "name": "Savita Desai",
        "phone": "7988611874",
        "profileUrl": "https://randomuser.me/api/portraits/women/60.jpg",
        "userRating": "4.2"
      },
      "owner": {
        "name": "Aditya Sharma",
        "phone": "9812345601",
        "profileUrl": "https://randomuser.me/api/portraits/men/24.jpg"
      }
    },
    {
      "tokenId": 10000210,
      "listingDate": "2022-08-24",
      "listingType": "SELL",
      "price": 1100000.0,
      "description": "Affordable studio for sale",
      "status": "INACTIVE",
      "property": {
        "propertyId": 50000145,
        "houseNo": "Q-110",
        "description": "Premium 1 BHK APARTMENT in Paltan Bazaar, Guwahati. Built in 2021 with 2379 sq ft area.",
        "locality": "Dispur",
        "area": "Paltan Bazaar",
        "city": "Guwahati",
        "pin": 781001,
        "size": 2379.0,
        "type": "APARTMENT",
        "BHK": 1
      },
      "agent": {
        "name": "Rekha Vyas",
        "phone": "9450012756",
        "profileUrl": "https://randomuser.me/api/portraits/women/15.jpg",
        "userRating": "3.0"
      },
      "owner": {
        "name": "Aditya Sharma",
        "phone": "9812345601",
        "profileUrl": "https://randomuser.me/api/portraits/men/24.jpg"
      }
    },
    {
      "tokenId": 10000215,
      "listingDate": "2022-04-16",
      "listingType": "SELL",
      "price": 1.18E7,
      "description": "Spacious property for sale",
      "status": "ACTIVE",
      "property": {
        "propertyId": 50000191,
        "houseNo": "K-708",
        "description": "Premium 5 BHK FLAT in Gomti Nagar, Lucknow. Built in 2017 with 2140 sq ft area.",
        "locality": "Charbagh",
        "area": "Gomti Nagar",
        "city": "Lucknow",
        "pin": 226001,
        "size": 2140.0,
        "type": "FLAT",
        "BHK": 5
      },
      "agent": {
        "name": "Rajesh Mistry",
        "phone": "9317942250",
        "profileUrl": "https://randomuser.me/api/portraits/men/97.jpg",
        "userRating": "2.9"
      },
      "owner": {
        "name": "Aditya Sharma",
        "phone": "9812345601",
        "profileUrl": "https://randomuser.me/api/portraits/men/24.jpg"
      }
    }
  ],
  "error": null,
  "timestamp": null
}




        {/* Property Details Preview */}
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col relative backdrop-blur-sm">
          <div className="h-[350px] min-h-[350px] relative group">
            <PropertyCarousel
              images={selectedProperty.images}
              title={selectedProperty.title}
            />
            <div className="absolute bottom-6 left-8 pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  {selectedProperty.type}
                </span>
                <span className="text-white/80 text-xs font-medium flex items-center gap-1">
                  <MapPin size={12} /> {selectedProperty.location}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {selectedProperty.title}
              </h2>
            </div>
            <div className="absolute bottom-6 right-8 pointer-events-none">
              <p className="text-2xl font-bold text-orange-500">
                {selectedProperty.price}
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                  <Bed size={16} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                    Bedrooms
                  </p>
                  <p className="text-white font-bold text-sm">
                    {selectedProperty.bhk} BHK
                  </p>
                </div>
              </div>
              <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                  <Bath size={16} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                    Bathrooms
                  </p>
                  <p className="text-white font-bold text-sm">
                    {selectedProperty.bath} Baths
                  </p>
                </div>
              </div>
              <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                  <Square size={16} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                    Total Area
                  </p>
                  <p className="text-white font-bold text-sm">
                    {selectedProperty.size}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
                    <Info className="text-orange-500" size={16} /> Description
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    {selectedProperty.description}
                  </p>
                </div>

                <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                    <Handshake className="text-orange-500" size={16} /> Make a
                    Deal
                  </h4>
                  <div className="flex items-center justify-between mb-4 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                        <Calendar size={16} />
                      </div>
                      <span className="text-xs font-bold text-zinc-300">
                        Visit Property
                      </span>
                    </div>
                    <button
                      onClick={() => setIsVisitToggle(!isVisitToggle)}
                      className={`w-10 h-5 rounded-full transition-all relative ${isVisitToggle ? "bg-orange-500" : "bg-zinc-700"}`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${isVisitToggle ? "left-5.5" : "left-0.5"}`}
                      ></div>
                    </button>
                  </div>
                  <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm">
                    Make a Deal <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <Briefcase className="text-orange-500" size={16} /> Assigned
                  Agent
                </h4>
                <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-orange-500/20">
                      {selectedProperty.agent.image}
                    </div>
                    <div>
                      <h5 className="text-white font-bold text-sm">
                        {selectedProperty.agent.name}
                      </h5>
                      <div className="flex items-center gap-1 text-orange-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold">
                          {selectedProperty.agent.rating} Rating
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-zinc-400 text-xs hover:text-white transition-colors cursor-pointer">
                      <Phone size={14} className="text-orange-500" />
                      <span className="font-medium">
                        {selectedProperty.agent.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-zinc-400 text-xs hover:text-white transition-colors cursor-pointer">
                      <Mail size={14} className="text-orange-500" />
                      <span className="font-medium truncate">
                        {selectedProperty.agent.email}
                      </span>
                    </div>
                  </div>
                  <button className="w-full mt-5 py-2 border border-orange-500/30 hover:bg-orange-500/10 text-orange-500 font-bold rounded-lg transition-all text-xs">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>