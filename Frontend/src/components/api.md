agentId:10000003
agentName:"Kiran Saxena"
amount:30289000
buyerId:10000036
buyerName:"Jyoti Bajaj"
city:"Mumbai"
date:"2022-01-18"
listingPrice:43270000
listingType:"SELL"
mode:"ONLINE"
propertyId:50000122
sellerId:10000067
sellerName:"Savita Shah"
transactionId:600011
type:"ADVANCE"

 const recentTransactions =
    transactions && transactions.length > 0
      ? transactions.reduce((prev, current) =>
          prev.date > current.date ? prev : current,
        ).slice(0, 5)
      : null;

this is the structure of the transaction i want to have 5 recentTransactions, based on the date