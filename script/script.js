let interviewList = [];
let rejectedList = [];
let currentStatus = 'all'

let total = document.getElementById('total');
let totalJobs = document.getElementById('totalJobs');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let jobHeaderTitle = document.getElementById('jobHeaderTitle');
let emptyState = document.getElementById('emptyState');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');
const buttons = [allFilterBtn, interviewBtn, rejectedBtn];
const activeClasses = ['bg-[#3B82F6]', 'hover:bg-[#2563EB]', 'text-white', 'border-none'];
const defaultClasses = ['btn-outline', 'border-base-300', 'text-slate-500', 'hover:bg-base-200', 'hover:text-slate-700'];

const filterSection = document.getElementById('filter-card-section');
const mainContainer = document.querySelector('main');
const allCardSection = document.getElementById('all-cards');


function calculateCard() {

    let totalCard = allCardSection.children.length;

    total.innerText = totalCard;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === 'interview-btn') {
        totalJobs.innerText = `${interviewList.length} of ${totalCard}`;
    }
    else if (currentStatus === 'rejected-btn') {
        totalJobs.innerText = `${rejectedList.length} of ${totalCard}`;
    }
    else {
        totalJobs.innerText = totalCard;
    }
}
calculateCard()


function checkEmptyState(listLength) {

    if (listLength === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

}


function toggleStyle(id) {
    const selected = document.getElementById(id);

    buttons.forEach(btn => {
        btn.classList.remove(...activeClasses);
        btn.classList.add(...defaultClasses);
    });

    selected.classList.remove(...defaultClasses);
    selected.classList.add(...activeClasses);

    currentStatus = id;
    if (id === 'interview-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderList(interviewList);
        checkEmptyState(interviewList.length);
    }
    else if (id === 'rejected-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderList(rejectedList);
        checkEmptyState(rejectedList.length);
    }
    else {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        checkEmptyState(allCardSection.children.length);
    }

    if (id === 'interview-btn') {
        jobHeaderTitle.innerText = "Interview Jobs";
    }
    else if (id === 'rejected-btn') {
        jobHeaderTitle.innerText = "Rejected Jobs";
    }
    else {
        jobHeaderTitle.innerText = "Available Jobs";
    }
    calculateCard()
}


function getCardInfo(parentNode, statusText) {
    return {
        id: parentNode.dataset.id,
        jobTitle: parentNode.querySelector('.job-title').innerText,
        jobSubtitle: parentNode.querySelector('.job-subtitle').innerText,
        jobInfo: parentNode.querySelector('.job-info').innerText,
        jobDetails: parentNode.querySelector('.job-details').innerText,
        status: statusText
    }
}

// this is a card function for creating card in filter section
function createCardHTML(data) {
    let badgeClass = "bg-[#EBF2FF] text-[#002C5C]";

    if (data.status === "Interview") {
        badgeClass = "bg-green-100 text-green-700";
    }
    else if (data.status === "Rejected") {
        badgeClass = "bg-red-100 text-red-700";
    }
    return `
    <div class="relative">
        <button onclick="(deleteCard(this))"
            class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 border border-base-200 p-1.5 hover:bg-error/10 hover:text-error transition-colors">
            <img src="image/delete-btn.png" alt="Delete" class="w-full h-full object-contain">
        </button>
        <div>
            <h3 class="job-title text-xl font-bold text-[#002C5C]">${data.jobTitle}</h3>
            <p class="job-subtitle text-slate-500 font-medium">${data.jobSubtitle}</p>
        </div>
        <div class="job-info flex flex-wrap gap-2 text-slate-500 text-sm mt-4">
            <h3>${data.jobInfo}</h3>
        </div>
        <div class="mt-4">
            <span
                class="status-badge ${badgeClass} px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                ${data.status}
            </span>
        </div>
        <p class="job-details text-slate-600 mt-4 leading-relaxed">
            ${data.jobDetails}
        </p>
        <div class="flex gap-3 mt-6">
            <button class="interview-btn btn btn-outline btn-success btn-sm px-6 font-bold uppercase text-[12px] tracking-wide">
                Interview
            </button>
            <button class="rejected-btn btn btn-outline btn-error btn-sm px-6 font-bold uppercase text-[12px] tracking-wide">
                Rejected
            </button>
        </div>
    </div>`;
}

function renderList(list) {

    filterSection.innerHTML = '';

    list.forEach(item => {

        const div = document.createElement('div');
        div.dataset.id = item.id;
        div.className = 'job-card card bg-base-100 border border-base-200 shadow-sm p-6 mb-4 transition-all duration-300 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300';

        div.innerHTML = createCardHTML(item);

        filterSection.appendChild(div);
    });

}



mainContainer.addEventListener('click', function (event) {

    const parent = event.target.closest('.job-card');
    if (!parent) return;

    // Interview
    if (event.target.classList.contains('interview-btn')) {

        const info = getCardInfo(parent, 'Interview');

        interviewList = interviewList.filter(i => i.id !== info.id);
        rejectedList = rejectedList.filter(i => i.id !== info.id);

        interviewList.push(info);

        updateAllCardBadge(info.id, 'Interview');

        if (currentStatus === 'interview-btn') {
            renderList(interviewList);
        }
    }

    // rejected
    if (event.target.classList.contains('rejected-btn')) {

        const info = getCardInfo(parent, 'Rejected');

        interviewList = interviewList.filter(i => i.id !== info.id);
        rejectedList = rejectedList.filter(i => i.id !== info.id);

        rejectedList.push(info);

        updateAllCardBadge(info.id, 'Rejected');

        if (currentStatus === 'rejected-btn') {
            renderList(rejectedList);
        }
    }
    if (currentStatus === 'interview-btn') renderList(interviewList);
    else if (currentStatus === 'rejected-btn') renderList(rejectedList);
    // checkEmptyState(interviewList.length);
    // checkEmptyState(rejectedList.length);
    // checkEmptyState(allCardSection.children.length);

    calculateCard()
});


function updateAllCardBadge(id, status) {

    const card = allCardSection.querySelector(`[data-id="${id}"]`);
    if (!card) return;

    const badge = card.querySelector('.status-badge');

    badge.innerText = status;

    if (status === 'Interview') {
        badge.className = "status-badge bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold uppercase";
    } else {
        badge.className = "status-badge bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-bold uppercase";
    }
}

//Delete function for deleting card from every section
function deleteCard(button) {

    if (!confirm('Are you sure you want to delete this job?')) return;

    const card = button.closest('.job-card');
    const id = card.dataset.id;

    interviewList = interviewList.filter(i => i.id !== id);
    rejectedList = rejectedList.filter(i => i.id !== id);

    const allCard = allCardSection.querySelector(`[data-id="${id}"]`);
    if (allCard) allCard.remove();
    card.remove();

    if (currentStatus === 'interview-btn') {
        checkEmptyState(interviewList.length);
    }
    else if (currentStatus === 'rejected-btn') {
        checkEmptyState(rejectedList.length);
    }
    else {
        checkEmptyState(allCardSection.children.length);
    }

    calculateCard();
}


