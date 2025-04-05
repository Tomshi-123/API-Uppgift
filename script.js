document.addEventListener('DOMContentLoaded', async () => {
    const userDataContainer = document.getElementById('userData-container');
    const modal = document.getElementById('modal');
    const modalInfo = document.getElementById('modal-info');
    const closeModal = document.querySelector('.close');

    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Error fetching user data');
            }
            const users = await response.json();
            userDataContainer.innerHTML = ''; 
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('userData-card');
                
                userCard.innerHTML = `
                    <h3>${user.name}</h3>
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <button class="moreInfoBtn" data-userid="${user.id}">More info</button>
                `;
                
                userDataContainer.appendChild(userCard);

                const moreInfoButton = userCard.querySelector('.moreInfoBtn');
                moreInfoButton.addEventListener('click', async () => {
                    try {
                        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`);
                        if (!userResponse.ok) {
                            throw new Error('Error fetching more info');
                        }
                        const userInfo = await userResponse.json();
                        modalInfo.innerHTML = `
                            <h3>${userInfo.name}</h3>
                            <p>Phone: ${userInfo.phone}</p>
                            <p>Website: ${userInfo.website}</p>
                            <p>Address: ${userInfo.address.street}, ${userInfo.address.city}</p>
                        `;
                        modal.style.display = 'flex';
                    } catch (error) {
                        console.error('Error fetching more info:', error);
                    }
                });
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            userDataContainer.innerHTML = '<p>Error fetching data</p>';
        }
    };


    fetchData();

 
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});