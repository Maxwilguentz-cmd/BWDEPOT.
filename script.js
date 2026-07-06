// 1. Enpòte modil Firebase Realtime Database 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Konfigirasyon Firebase ou 
const firebaseConfig = {  
    apiKey: "AIzaSyA76yMMRz0VgcoywUJNvgdP3h4l7S6Xogk", 
    authDomain: "bwdepot-61214.firebaseapp.com",
    databaseURL: "https://bwdepot-61214-default-rtdb.firebaseio.com",
    projectId: "bwdepot-61214",
    storageBucket: "bwdepot-61214.firebasestorage.app",
    messagingSenderId: "624010872324", 
    appId: "1:624010872324:web:0b0565c3872b3caccd5751",  
    measurementId: "G-8VEN9QQF7B" 
};

// Inisyalize aplikasyon Firebase la
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// --- DONE INIASYAL YO ---
let inventory = [
    { id: 1, name: "Ti Fritop ", img: "Frutop img.PNG", stockGrenn: 240, stockFrizerGrenn: 30, prices: { detail: 50, demi: 400, kes: 800 }, buyingPrice: { detail: 0, demi: 280, kes: 560 } },
    { id: 2, name: "Frutop", img: "Frutop img.PNG", stockGrenn: 100, stockFrizerGrenn: 10, prices: { detail: 75, demi: 550, kes: 1100 }, buyingPrice: { detail: 0, demi: 400, kes: 800 } },
    { id: 3, name: "Fanta", img: "Fanta img.JPG", stockGrenn: 100, stockFrizerGrenn: 6, prices: { detail: 100, demi: 750, kes: 1500 }, buyingPrice: { detail: 0, demi: 550, kes: 1100 } },
    { id: 4, name: "Dasani", img: "dasani img.JPG", stockGrenn: 120, stockFrizerGrenn: 15, prices: { detail: 50, demi: 425, kes: 850 }, buyingPrice: { detail: 0, demi: 300, kes: 600 } },
    { id: 5, name: "Prestige", img: "prestige img.JPG", stockGrenn: 80, stockFrizerGrenn: 12, prices: { detail: 200, demi: 2000, kes: 4000 }, buyingPrice: { detail: 0, 160, demi: 1600, kes: 3200 } },
    { id: 6, name: "Valle", img: "valle img.JPG", stockGrenn: 100, stockFrizerGrenn: 10, prices: { detail: 50, demi: 500, kes: 1000 }, buyingPrice: { detail: 0, demi: 380, kes: 750 } },
    { id: 7, name: "Tampico", img: "tampico img.JPG", stockGrenn: 90, stockFrizerGrenn: 8, prices: { detail: 75, demi: 675, kes: 1350 }, buyingPrice: { detail: 0, demi: 500, kes: 1000 } },
    { id: 8, name: "Robusto", img: "robusto img.JPG", stockGrenn: 150, stockFrizerGrenn: 12, prices: { detail: 100, demi: 1100, kes: 2200 }, buyingPrice: { detail: 0, demi: 850, kes: 1700 } },
    { id: 9, name: "Toro", img: "toro img.JPG", stockGrenn: 100, stockFrizerGrenn: 10, prices: { detail: 125, demi: 1300, kes: 2600 }, buyingPrice: { detail: 0, demi: 1000, kes: 2000 } },
    { id: 10, name: "Malta H", img: "maltah img.JPG", stockGrenn: 100, stockFrizerGrenn: 10, prices: { detail: 125, demi: 1250, kes: 2500 }, buyingPrice: { detail: 0, demi: 950, kes: 1900 } },
    { id: 11, name: "Beller", img: "beller img.JPG", stockGrenn: 120, stockFrizerGrenn: 15, prices: { detail: 50, demi: 500, kes: 1000 }, buyingPrice: { detail: 0, demi: 380, kes: 750 } },
    { id: 12, name: "Real", img: "real img.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 50, demi: 475, kes: 950 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 13, name: "7up", img: "7up.PNG", stockGrenn: 0, stockFrizerGrenn: 0, prices: { detail: 100, demi: 475, kes: 950 }, buyingPrice: { detail: 0, demi: 0, kes: 660 } },
    { id: 14, name: "Red", img: "Red.JPG", stockGrenn: 0, stockFrizerGrenn: 24, prices: { detail: 100, demi: 875, kes: 1750 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 15, name: "Pro Rade", img: "Prorade.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 100, demi: 1000, kes: 2000 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 16, name: "Redrock", img: "Rad Rock.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 50, demi: 475, kes: 950 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 17, name: "Generade", img: "Generade.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 100, demi: 650, kes: 1300 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 18, name: "Ragaman", img: "ragaman.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 125, demi: 1100, kes: 2200 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 19, name: "Limonade", img: "limonade.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 100, demi: 750, kes: 1500 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 20, name: "Coca Cola", img: "Cacacola.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 100, demi: 750, kes: 1500 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 21, name: "Couronne", img: "Couronne.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 100, demi: 750, kes: 1500 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 22, name: "Atomik", img: "Atomik.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 100, demi: 750, kes: 1500 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 23, name: "Aloe", img: "Aloe.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 250, demi: 2000, kes: 4000 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 24, name: "Pepsi", img: "Pepsi.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 50, demi: 475, kes: 950 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 25, name: "Petit", img: "Petit.WEBP", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 125, demi: 1500, kes: 3000 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 26, name: "Matla H bouteille", img: "Malta H bouteille.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 150, demi: 2000, kes: 4000 }, buyingPrice: { detail: 0, demi: 330, kes: 660 } },
    { id: 27, name: "Guinness", img: "Guinness.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 50, demi: 475, kes: 950 }, buyingPrice: { detail: 0, demi: 0, kes: 0 } },
    { id: 28, name: "Splash", img: "Splash.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 50, demi: 475, kes: 950 }, buyingPrice: { detail: 0, demi: 0, kes: 0 } },
    { id: 29, name: "Frooty", img: "Frooty.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 50, demi: 475, kes: 950 }, buyingPrice: { detail: 38, demi: 330, kes: 660 } },
    { id: 30, name: "Ti Fanta", img: "Ti fanta.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 50, demi: 475, kes: 950 }, buyingPrice: { detail: 38, demi: 330, kes: 660 } },
    { id: 31, name: "Ti Couronne ", img: "Ti couronne.JPG", stockGrenn: 180, stockFrizerGrenn: 24, prices: { detail: 50, demi: 475, kes: 950 }, buyingPrice: { detail: 38, demi: 330, kes: 660 } }];

let currentCart = [];
let totalRevenue = 0;
let totalProfit = 0;
let natCashBalance = 5000; 
let physicalCashBalance = 0; 
let currentTheme = "light";
let isAdminAuthenticated = false;

let adminFonDeKes = { natcash: 0, gwo: 0, detay: 0 };
let verifiedSections = { natcash: false, bwason: false };
let currentVerifyingType = ""; 

// --- FONKSYON POU SOVE DONE YO NAN FIREBASE ---
function saveAppStateToFirebase() {
    set(ref(database, 'appState'), {
        inventory: inventory,
        totalRevenue: totalRevenue,
        totalProfit: totalProfit,
        natCashBalance: natCashBalance,
        physicalCashBalance: physicalCashBalance,
        adminFonDeKes: adminFonDeKes,
        verifiedSections: verifiedSections,
        adminExpenseLogs: document.getElementById('admin-expense-logs')?.innerHTML || "",
        logsAnGwo: document.getElementById('logs-an-gwo')?.innerHTML || "",
        logsAnDetay: document.getElementById('logs-an-detay')?.innerHTML || "",
        posNatLogs: document.getElementById('pos-nat-logs')?.innerHTML || "",
        adminNatLogs: document.getElementById('admin-nat-logs')?.innerHTML || "",
        adminDisputeAlert: document.getElementById('admin-dispute-alert')?.style.display || "none",
        adminDisputeText: document.getElementById('admin-dispute-text')?.innerText || "",
        adminCloseAlert: document.getElementById('admin-close-alert')?.style.display || "none",
        adminCloseText: document.getElementById('admin-close-text')?.innerText || ""
    });
}

// --- CHAJE DONE YO DEPI NAN FIREBASE LÈ PAJ LA LOUVRI ---
onValue(ref(database, 'appState'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        if (data.inventory) inventory = data.inventory;
        totalRevenue = data.totalRevenue || 0;
        totalProfit = data.totalProfit || 0;
        natCashBalance = data.natCashBalance !== undefined ? data.natCashBalance : 5000;
        physicalCashBalance = data.physicalCashBalance || 0;
        if (data.adminFonDeKes) adminFonDeKes = data.adminFonDeKes;
        if (data.verifiedSections) verifiedSections = data.verifiedSections;
        
        if (data.adminExpenseLogs && document.getElementById('admin-expense-logs')) document.getElementById('admin-expense-logs').innerHTML = data.adminExpenseLogs;
        if (data.logsAnGwo && document.getElementById('logs-an-gwo')) document.getElementById('logs-an-gwo').innerHTML = data.logsAnGwo;
        if (data.logsAnDetay && document.getElementById('logs-an-detay')) document.getElementById('logs-an-detay').innerHTML = data.logsAnDetay;
        if (data.posNatLogs && document.getElementById('pos-nat-logs')) document.getElementById('pos-nat-logs').innerHTML = data.posNatLogs;
        if (data.adminNatLogs && document.getElementById('admin-nat-logs')) document.getElementById('admin-nat-logs').innerHTML = data.adminNatLogs;
        
        if (document.getElementById('admin-dispute-alert')) {
            document.getElementById('admin-dispute-alert').style.display = data.adminDisputeAlert || "none";
            document.getElementById('admin-dispute-text').innerText = data.adminDisputeText || "";
        }
        if (document.getElementById('admin-close-alert')) {
            document.getElementById('admin-close-alert').style.display = data.adminCloseAlert || "none";
            document.getElementById('admin-close-text').innerText = data.adminCloseText || "";
        }
    }
    renderProducts();
    updateAdminDashboard();
});

// --- NAVIGASYON PAJ YO ---
window.showPage = function(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));

    // Gade byen: HTML ou an itilize id="page-natcash-tab" ak id="page-pos" ak id="page-admin"
    const activePage = document.getElementById(`page-${pageId}`);
    const activeNav = document.getElementById(`nav-${pageId}`);
    
    if(activePage) activePage.classList.add('active');
    if(activeNav) activeNav.classList.add('active');

    if(pageId === 'pos') {
        renderProducts();
    }
    
    if(pageId === 'admin') {
        if(isAdminAuthenticated) {
            document.getElementById('admin-auth').style.display = 'none';
            document.getElementById('admin-content').style.display = 'block';
            updateAdminDashboard();
            populateAdminSelects();
            renderFrizerStockTable();
        } else {
            document.getElementById('admin-auth').style.display = 'flex';
            document.getElementById('admin-content').style.display = 'none';
        }
    }
}

window.triggerPageSecurity = function(pageId) {
    if (pageId === 'natcash-tab' && !verifiedSections.natcash && adminFonDeKes.natcash > 0) {
        currentVerifyingType = "natcash";
        openVerificationModal(`Verifikasyon NatCash`, `Admin nan kite yon fon de kès **${adminFonDeKes.natcash} HTG (S${adminFonDeKes.natcash / 5})** pou pati NatCash la. Èske ou dakò kòb sa a la nan menw?`);
        return;
    }
    if (pageId === 'pos' && !verifiedSections.bwason && (adminFonDeKes.gwo > 0 || adminFonDeKes.detay > 0)) {
        currentVerifyingType = "bwason";
        let totalBwasonFon = adminFonDeKes.gwo + adminFonDeKes.detay;
        openVerificationModal(`Verifikasyon Kès Bwason`, `Admin nan kite yon fon de kès jeneral ki valè **${totalBwasonFon} HTG (S${totalBwasonFon / 5})** (An gwo: ${adminFonDeKes.gwo}g, Detay: ${adminFonDeKes.detay}g). Èske ou dakò chif sa yo ki la?`);
        return;
    }
    
    // Si pa gen sekirite k ap bloke, nou afiche paj la dirèkteman
    showPage(pageId);
}

window.openVerificationModal = function(title, msg) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-msg').innerText = msg;
    document.getElementById('dispute-section').style.display = 'none';
    document.getElementById('modal-initial-btns').style.display = 'flex';
    document.getElementById('verification-popup').style.display = 'flex';
}

window.acceptFonDeKes = function() {
    if (currentVerifyingType === "natcash") {
        verifiedSections.natcash = true;
        physicalCashBalance += adminFonDeKes.natcash; 
        showPage('natcash-tab'); // Matche ak HTML ou a perfectly
    } else if (currentVerifyingType === "bwason") {
        verifiedSections.bwason = true;
        physicalCashBalance += (adminFonDeKes.gwo + adminFonDeKes.detay);
        showPage('pos');
    }
    document.getElementById('verification-popup').style.display = 'none';
    updateAdminDashboard();
    saveAppStateToFirebase();
}

window.showDisputeInput = function() {
    document.getElementById('modal-initial-btns').style.display = 'none';
    document.getElementById('dispute-section').style.display = 'block';
    document.getElementById('disputed-amount-input').value = '';
}

window.submitDispute = function() {
    let realAmount = parseFloat(document.getElementById('disputed-amount-input').value);
    if (isNaN(realAmount) || realAmount < 0) return alert("Tanpri antre yon chif valab!");

    let adminAmountExpected = 0;
    let sectionName = "";

    if (currentVerifyingType === "natcash") {
        adminAmountExpected = adminFonDeKes.natcash;
        sectionName = "NatCash";
        verifiedSections.natcash = true; 
        physicalCashBalance += realAmount;
        showPage('natcash-tab'); 
    } else if (currentVerifyingType === "bwason") {
        adminAmountExpected = adminFonDeKes.gwo + adminFonDeKes.detay;
        sectionName = "Vant Bwason (An gwo + Detay)";
        verifiedSections.bwason = true;
        physicalCashBalance += realAmount;
        showPage('pos');
    }

    document.getElementById('admin-dispute-alert').style.display = "block";
    document.getElementById('admin-dispute-text').innerText = `Vandè a konteste fon de kès pou [${sectionName}] la! Ou te mete ${adminAmountExpected} Goud (S${adminAmountExpected / 5}), men li deklare li jwenn ${realAmount} Goud (S${realAmount / 5}) nan kès la.`;

    document.getElementById('verification-popup').style.display = 'none';
    alert("⚠️ Yo voye kontestasyon an bay Admin nan.");
    updateAdminDashboard();
    saveAppStateToFirebase();
}

window.openExpenseModal = function() {
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-reason').value = '';
    document.getElementById('expense-popup').style.display = 'flex';
}

window.closeExpenseModalOutside = function(event) {
    document.getElementById('expense-popup').style.display = 'none';
}

window.submitExpense = function() {
    let amt = parseFloat(document.getElementById('expense-amount').value);
    let reason = document.getElementById('expense-reason').value.trim();

    if (isNaN(amt) || amt <= 0) return alert("Tanpri antre yon montan valab!");
    if (reason === "") return alert("Tanpri ekri rezon depans lan!");
    if (amt > physicalCashBalance) return alert("⚠️ Kòb ki nan kès la mwens pase depans sa a!");

    physicalCashBalance -= amt;
    
    let timeStr = new Date().toLocaleTimeString();
    let expLogBox = document.getElementById('admin-expense-logs');
    if (expLogBox.innerHTML.includes("Pa gen depans")) expLogBox.innerHTML = '';
    expLogBox.innerHTML = `[${timeStr}] 💸 -${amt} Goud (S${amt / 5}) : ${reason}<br>` + expLogBox.innerHTML;

    document.getElementById('expense-popup').style.display = 'none';
    alert(`✅ Depans pou "${reason}" (${amt} HTG / S${amt / 5}) anrejistre.`);
    updateAdminDashboard();
    saveAppStateToFirebase();
}

window.openCloseKesModal = function() {
    document.getElementById('vandes-counted-cash').value = '';
    document.getElementById('close-kes-popup').style.display = 'flex';
}

window.submitCloseKesBlind = function() {
    let counted = parseFloat(document.getElementById('vandes-counted-cash').value);
    if (isNaN(counted) || counted < 0) return alert("Tanpri antre yon kantite kòb valab!");

    let systemExpected = physicalCashBalance;
    let eka = counted - systemExpected;
    let rapòMesaj = "";

    if (eka === 0) {
        rapòMesaj = `✅ Kès la Fèmen Kòrèk (A 3h PM).\nVandè a konte: ${counted} Goud (S${counted / 5}).\nSistèm nan te kalkile: ${systemExpected} Goud (S${systemExpected / 5}).\nEka: 0 Goud.`;
    } else if (eka < 0) {
        rapòMesaj = `⚠️ ALÈT MANQO (Kòb Manke a 3h PM):\nVandè a deklare li jwenn: ${counted} Goud (S${counted / 5}).\nSistèm nan te kalkile: ${systemExpected} Goud (S${systemExpected / 5}).\n🔴 MANKE: ${Math.abs(eka)} Goud (S${Math.abs(eka) / 5})!`;
    } else {
        rapòMesaj = `🟢 ALÈT EKSÈ (Kòb Anplis a 3h PM):\nVandè a deklare li jwenn: ${counted} Goud (S${counted / 5}).\nSistèm nan te kalkile: ${systemExpected} Goud (S${systemExpected / 5}).\n🔵 ANPLIS: ${eka} Goud (S${eka / 5})!`;
    }

    document.getElementById('admin-close-alert').style.display = "block";
    document.getElementById('admin-close-text').innerText = rapòMesaj;

    document.getElementById('close-kes-popup').style.display = 'none';
    alert("🔒 Yo voye rapò fèmti kès la bay Admin nan.");
    saveAppStateToFirebase();
}

window.saveFonDeKesFromAdmin = function() {
    adminFonDeKes.natcash = parseFloat(document.getElementById('setup-fon-natcash').value) || 0;
    adminFonDeKes.gwo = parseFloat(document.getElementById('setup-fon-gwo').value) || 0;
    adminFonDeKes.detay = parseFloat(document.getElementById('setup-fon-detay').value) || 0;

    verifiedSections.natcash = false;
    verifiedSections.bwason = false;
    alert(`Sove! Vandè a ap gen pou l verifye yo.`);
    saveAppStateToFirebase();
}

window.checkAdminAuth = function() {
    let pass = document.getElementById('admin-pass-input').value;
    if(pass === "1234") {
        isAdminAuthenticated = true;
        document.getElementById('admin-auth').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        updateAdminDashboard();
        populateAdminSelects();
        renderFrizerStockTable();
    } else {
        alert("❌ Modpas Kòd Admin Enkòrèk!");
    }
    document.getElementById('admin-pass-input').value = '';
}

window.lockAdmin = function() {
    isAdminAuthenticated = false;
    document.getElementById('admin-content').style.display = 'none';
    document.getElementById('admin-auth').style.display = 'flex';
}

window.showSubPage = function(subId) {
    document.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
    
    const activeSubPage = document.getElementById(`sub-page-${subId}`);
    const activeSubNav = document.getElementById(`sub-nav-${subId}`);

    if(activeSubPage) activeSubPage.classList.add('active');
    if(activeSubNav) activeSubNav.classList.add('active');
}

function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = '';
    
    inventory.forEach(p => {
        let isLowStock = p.stockGrenn < 24;
        let alertBadge = isLowStock ? `<div class="stock-alert">⚠️ Stòk ba!</div>` : '';
        
        container.innerHTML += `
            <div class="prod-card" data-name="${p.name.toLowerCase()}">
                ${alertBadge}
                <img src="${p.img}" alt="${p.name}">
                <div class="prod-info">
                    <div class="prod-name">${p.name}</div>
                    <div class="prod-stock">Depo: <strong>${p.stockGrenn}g</strong> | <span style="color:var(--purple);font-weight:bold;">Frize: ${p.stockFrizerGrenn}g</span></div>
                    <div class="type-selector">
                        <button class="type-btn" onclick="addToCart(${p.id}, 'detail')">Detay (${p.prices.detail}g <span style="font-size:10px;font-weight:normal;opacity:0.8;">/ S${p.prices.detail / 5}</span>)</button>
                        <button class="type-btn" onclick="addToCart(${p.id}, 'demi')">½ Kès (${p.prices.demi}g <span style="font-size:10px;font-weight:normal;opacity:0.8;">/ S${p.prices.demi / 5}</span>)</button>
                    </div>
                    <button class="btn-sell" onclick="addToCart(${p.id}, 'kes')" style="background:var(--primary);">+ Kès Depo (${p.prices.kes}g <span style="font-size:11px;font-weight:normal;opacity:0.8;">/ S${p.prices.kes / 5}</span>)</button>
                </div>
            </div>
        `;
    });
}

function populateAdminSelects() {
    const restockSelect = document.getElementById('restock-select');
    const frizerSelect = document.getElementById('frizer-select-prod');
    const gasteSelect = document.getElementById('gaste-select-prod');

    if (!restockSelect) return;
    restockSelect.innerHTML = ''; frizerSelect.innerHTML = ''; gasteSelect.innerHTML = '';

    inventory.forEach(p => {
        let optionHTML = `<option value="${p.id}">${p.name}</option>`;
        restockSelect.innerHTML += optionHTML;
        frizerSelect.innerHTML += optionHTML;
        gasteSelect.innerHTML += optionHTML;
    });
}

window.moveProductToFrizer = function() {
    let prodId = parseInt(document.getElementById('frizer-select-prod').value);
    let type = document.getElementById('frizer-select-type').value;
    let qty = parseInt(document.getElementById('frizer-qty').value);

    if(isNaN(qty) || qty <= 0) return alert("Antre yon kantite ki valab!");

    let multiplier = type === 'detail' ? 1 : type === 'demi' ? 12 : 24;
    let totalGrennToMove = qty * multiplier;
    let p = inventory.find(item => item.id === prodId);

    if(p.stockGrenn < totalGrennToMove) return alert(`⚠️ Pa gen ase stòk nan depo!`);

    p.stockGrenn -= totalGrennToMove; p.stockFrizerGrenn += totalGrennToMove;
    alert(`❄️ Siksè! ${totalGrennToMove} grenn deplase.`);
    renderFrizerStockTable(); updateAdminDashboard();
    saveAppStateToFirebase();
}

function renderFrizerStockTable() {
    const tbody = document.getElementById('frizer-stock-rows');
    if (!tbody) return;
    tbody.innerHTML = '';
    inventory.forEach(p => {
        tbody.innerHTML += `<tr><td><strong>${p.name}</strong></td><td><span style="color:var(--purple); font-weight:bold;">${p.stockFrizerGrenn}</span> grenn</td></tr>`;
    });
}

window.reportGasteProduct = function() {
    let prodId = parseInt(document.getElementById('gaste-select-prod').value);
    let qty = parseInt(document.getElementById('gaste-qty').value);
    if(isNaN(qty) || qty <= 0) return alert("Antre yon kantite valab!");
    let p = inventory.find(prod => prod.id === prodId);
    if(p.stockGrenn < qty) return alert(`⚠️ Pa gen ase stòk!`);
    p.stockGrenn -= qty;
    alert(`💥 Yo retire ${qty} grenn koule.`);
    updateAdminDashboard();
    saveAppStateToFirebase();
}

window.filterProducts = function() {
    let filterValue = document.getElementById('search-box').value.toLowerCase();
    document.querySelectorAll('.prod-card').forEach(card => {
        let name = card.getAttribute('data-name');
        card.style.display = name.includes(filterValue) ? "flex" : "none";
    });
}

window.toggleTheme = function() {
    const root = document.documentElement;
    const btn = document.getElementById('theme-btn');
    if(currentTheme === "light") {
        root.setAttribute('data-theme', 'dark');
        btn.innerText = "🌙 Nwit"; currentTheme = "dark";
    } else {
        root.removeAttribute('data-theme');
        btn.innerText = "☀️ Lajounen"; currentTheme = "light";
    }
}

window.addToCart = function(prodId, type) {
    let p = inventory.find(item => item.id === prodId);
    let labelType = type === 'detail' ? 'Grenn' : type === 'demi' ? 'Demi-Kès' : 'Kès';
    let qtyNeeded = type === 'detail' ? 1 : type === 'demi' ? 12 : 24;

    if(type === 'detail') {
        if (p.stockFrizerGrenn < qtyNeeded) return alert(`⚠️ Pa gen ase bwason frèt nan FRIZÈ a!`);
    } else {
        if (p.stockGrenn < qtyNeeded) return alert(`⚠️ Pa gen ase stòk nan depo jeneral la!`);
    }

    currentCart.push({ uniqueId: Date.now() + Math.random(), prodId: p.id, name: p.name, type: type, labelType: labelType, price: p.prices[type], buyPrice: p.buyingPrice[type], qtyNeeded: qtyNeeded });
    renderCart();
}

window.removeFromCart = function(uniqueId) {
    if(prompt("KÒD SEKIRITE ADMIN:") === "1234") {
        currentCart = currentCart.filter(item => item.uniqueId !== uniqueId);
        renderCart();
    } else {
        alert("❌ Kòd enkòrèk!");
    }
}

function renderCart() {
    const tbody = document.getElementById('cart-rows');
    if (!tbody) return;
    tbody.innerHTML = ''; let total = 0;
    currentCart.forEach(item => {
        total += item.price;
        tbody.innerHTML += `<tr>
            <td><strong>${item.name}</strong></td>
            <td>${item.labelType}</td>
            <td><strong>${item.price} G <span style="font-size:10px;font-weight:normal;opacity:0.7;">(S${item.price / 5})</span></strong></td>
            <td style="text-align:right;"><button onclick="removeFromCart(${item.uniqueId})" style="border:none; background:none; color:var(--danger); font-weight:bold; cursor:pointer;">❌</button></td>
        </tr>`;
    });
    document.getElementById('bill-total-display').innerText = total + " HTG (S" + (total / 5) + ")";
}

window.checkoutSale = function() {
    if(currentCart.length === 0) return alert("Chwazi yon pwodwi anvan!");
    let billTotal = 0; let billProfit = 0;
    let timeStr = new Date().toLocaleTimeString();
    let logGwoBox = document.getElementById('logs-an-gwo');
    let logDetayBox = document.getElementById('logs-an-detay');

    if(logGwoBox && logGwoBox.innerHTML.includes("Pa gen lavant")) logGwoBox.innerHTML = '';
    if(logDetayBox && logDetayBox.innerHTML.includes("Pa gen lavant")) logDetayBox.innerHTML = '';

    currentCart.forEach(item => {
        let p = inventory.find(prod => prod.id === item.prodId);
        if(item.type === 'detail') {
            p.stockFrizerGrenn -= item.qtyNeeded;
            if(logDetayBox) logDetayBox.innerHTML = `[${timeStr}] 🥤 ${p.name} -> ${item.price} G (S${item.price / 5})<br>` + logDetayBox.innerHTML;
        } else {
            p.stockGrenn -= item.qtyNeeded;
            if(logGwoBox) logGwoBox.innerHTML = `[${timeStr}] 📦 ${p.name} -> ${item.price} G (S${item.price / 5})<br>` + logGwoBox.innerHTML;
        }
        billTotal += item.price; billProfit += (item.price - item.buyPrice);
    });

    totalRevenue += billTotal; totalProfit += billProfit; physicalCashBalance += billTotal; 
    alert(`✅ Lavant anrejistre (${billTotal} HTG / S${billTotal / 5}).`);
    currentCart = []; 
    renderCart(); 
    renderProducts(); 
    renderFrizerStockTable(); 
    updateAdminDashboard();
    saveAppStateToFirebase();
}

window.processNatCash = function(type) {
    let amountInput = document.getElementById('nat-amount');
    let amt = parseFloat(amountInput.value);
    if(isNaN(amt) || amt <= 0) return alert("Antre yon montan valab!");
    let timeStr = new Date().toLocaleTimeString();
    let safeLog = ""; let adminLog = ""; 

    if(type === 'depo') {
        if(natCashBalance < amt) return alert("⚠️ Pa gen ase balans NatCash sou kont lan pou fè depo sa a!");
        
        natCashBalance -= amt; 
        physicalCashBalance += amt;   
        safeLog = `🔹 [${timeStr}] 📥 DEPO: +${amt} HTG / S${amt / 5} (Pran Kach)`;
        adminLog = `[${timeStr}] 📥 DEPO: NatCash -${amt} G. Kach +${amt}g (S${amt / 5}).`;

    } else if(type === 'retre') {
        if(physicalCashBalance < amt && !confirm("⚠️ Pa gen ase kòb fizik nan kès, kontinye?")) return;
        
        natCashBalance += amt; 
        physicalCashBalance -= amt;   
        safeLog = `🔸 [${timeStr}] 📤 RETRÈ: -${amt} HTG / S${amt / 5} (Remèt Kach)`;
        adminLog = `[${timeStr}] 📤 RETRÈ: NatCash +${amt} G. Kach -${amt}g (S${amt / 5}).`;
    }

    const posLogBox = document.getElementById('pos-nat-logs');
    if(posLogBox && posLogBox.innerHTML.includes("Pa gen tranzaksyon")) posLogBox.innerHTML = '';
    if(posLogBox) posLogBox.innerHTML = safeLog + "<br>" + posLogBox.innerHTML;

    const adminLogBox = document.getElementById('admin-nat-logs');
    if(adminLogBox && adminLogBox.innerHTML.includes("Pa gen operasyon")) adminLogBox.innerHTML = '';
    if(adminLogBox) adminLogBox.innerHTML = adminLog + "<br>" + adminLogBox.innerHTML;

    amountInput.value = ''; updateAdminDashboard();
    saveAppStateToFirebase();
}

window.updateNatBalanceFromAdmin = function() {
    let val = parseFloat(document.getElementById('admin-set-nat-balance').value);
    if(isNaN(val) || val < 0) return alert("Antre chif valab!");
    natCashBalance = val; document.getElementById('admin-set-nat-balance').value = '';
    updateAdminDashboard();
    saveAppStateToFirebase();
}

function updateAdminDashboard() {
    if(document.getElementById('pos-cash-display')) document.getElementById('pos-cash-display').innerHTML = physicalCashBalance.toLocaleString() + " HTG <span style='font-size:12px;font-weight:normal;opacity:0.7;'>[S" + (physicalCashBalance / 5).toLocaleString() + "]</span>";
    if(document.getElementById('vandes-natcash-display')) document.getElementById('vandes-natcash-display').innerHTML = natCashBalance.toLocaleString() + " HTG <span style='font-size:12px;font-weight:normal;opacity:0.7;'>[S" + (natCashBalance / 5).toLocaleString() + "]</span>";
    if(document.getElementById('vandes-cash-display')) document.getElementById('vandes-cash-display').innerHTML = physicalCashBalance.toLocaleString() + " HTG <span style='font-size:12px;font-weight:normal;opacity:0.7;'>[S" + (physicalCashBalance / 5).toLocaleString() + "]</span>";
    if(document.getElementById('vandes-live-cash')) document.getElementById('vandes-live-cash').innerHTML = physicalCashBalance.toLocaleString() + " HTG <span style='font-size:12px;font-weight:normal;opacity:0.7;'>[S" + (physicalCashBalance / 5).toLocaleString() + "]</span>";

    if(!isAdminAuthenticated) return;
    if(document.getElementById('stat-revenue')) document.getElementById('stat-revenue').innerHTML = totalRevenue.toLocaleString() + " G <span style='font-size:12px;font-weight:normal;opacity:0.7;'>[S" + (totalRevenue / 5).toLocaleString() + "]</span>";
    if(document.getElementById('stat-profit')) document.getElementById('stat-profit').innerHTML = totalProfit.toLocaleString() + " G <span style='font-size:12px;font-weight:normal;opacity:0.7;'>[S" + (totalProfit / 5).toLocaleString() + "]</span>";
    if(document.getElementById('stat-nat-balance')) document.getElementById('stat-nat-balance').innerHTML = natCashBalance.toLocaleString() + " G <span style='font-size:12px;font-weight:normal;opacity:0.7;'>[S" + (natCashBalance / 5).toLocaleString() + "]</span>";

    let totalStockVal = 0;
    inventory.forEach(p => { totalStockVal += ((p.stockGrenn + p.stockFrizerGrenn) * p.prices.detail); });
    if(document.getElementById('stat-stock-value')) document.getElementById('stat-stock-value').innerHTML = totalStockVal.toLocaleString() + " G <span style='font-size:12px;font-weight:normal;opacity:0.7;'>[S" + (totalStockVal / 5).toLocaleString() + "]</span>";
}

window.submitRestock = function() {
    let action = document.getElementById('restock-action').value; // Li si se 'add' oswa 'remove'
    let prodId = parseInt(document.getElementById('restock-select').value);
    let qty = parseInt(document.getElementById('restock-qty').value);
    
    if (isNaN(qty) || qty <= 0) return alert("Tanpri antre yon kantite ki valab!");
    
    let p = inventory.find(prod => prod.id === prodId);
    
    if (action === 'remove') {
        // Lojik pou Retire nan stòk depo a
        if (p.stockGrenn < qty) return alert(`⚠️ Stòk la twò piti! Gen sèlman ${p.stockGrenn} grenn nan depo.`);
        p.stockGrenn -= qty;
        alert(`📤 Siksè! Yo retire ${qty} grenn nan stòk ${p.name}.`);
    } else {
        // Lojik pou Ajoute (ansyen an)
        p.stockGrenn += qty;
        alert(`📥 Siksè! Yo ajoute ${qty} grenn nan stòk ${p.name}.`);
    }
    
    // Netwaye bwat kantite a epi rafrechi paj la
    document.getElementById('restock-qty').value = '';
    renderProducts();
    updateAdminDashboard(); // Pou rafrechi valè stòk jeneral la nan Dashboard la tou
    saveAppStateToFirebase();
}

// Premye afichaj lè sistèm lan lise
renderProducts();
