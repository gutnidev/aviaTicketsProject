export default {
    putToLocal(item) {
        let tickets = localStorage.getItem('favouriteTickets');
        if (tickets){
            tickets = JSON.parse(tickets);
            tickets.push(item);
            localStorage.removeItem('favouriteTickets');
            localStorage.setItem('favouriteTickets', JSON.stringify(tickets));
            return true;
        }
        tickets = [];
        tickets.push(item);
        localStorage.setItem('favouriteTickets', JSON.stringify(tickets));
    },
    updateLocal(array) {
        if (localStorage.getItem('favouriteTickets')) localStorage.removeItem('favouriteTickets');

        localStorage.setItem('favouriteTickets', JSON.stringify(array));
    },
    getFromLocal() {
        let tickets = localStorage.getItem('favouriteTickets');

        if (!tickets){
            return [];
        }

        tickets = JSON.parse(tickets);

        return tickets;
    },
}