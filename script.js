// ==========================================
// 1. STATE GLOBAL POU SITIYASYON KÈS LA
// ==========================================
const AppState = {
    products: [
        { id: 1, name: "Netflix Premium 1 Mwa", price: 150, stock: 12, image: "https://via.placeholder.com/95" },
        { id: 2, name: "Free Fire 100 Diamonds", price: 130, stock: 3, image: "https://via.placeholder.com/95" },
        { id: 3, name: "PUBG Mobile 60 UC", price: 120, stock: 25, image: "https://via.placeholder.com/95" }
    ],
    cart: [],
    // Finans ak Kontwòl
    fondDeCaisse: 2000,      // Lajan ki te nan kès la lè l t ap louvri
    ventesCash: 0,           // Total lavant an kach
    ventesNatcash: 0,        // Total lavant pa Natcash
    depenses: 0,             // Total depans ki fèt
    liveCash: 2000,          // Fond de Caisse + Ventes Cash - Depenses
    systemTotalCalculated: 2000, // Sa sistèm nan kalkile (Fond + Tout Lavant - Depans)
    
    // Sekirite ak Eta Kès
    isLocked: false,
    currentTheme: "light"
};

// ==========================================
// 2. INICIALIZASYON AK NAVIGASYON
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupEventListeners();
});

function initApp() {
    renderProducts();
    updateFinancialDOM();
    logSystem("Sistèm BWdepo Premium demare ak siksè.");
}

function setupEventListeners() {
    // Navigasyon Prensipal
    document.querySelectorAll("nav button").forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (AppState.isLocked) {
                alert("Kès la fèmen! Admin dwe verifye l pou l ka debloke.");
                return;
            }
            const pageId = e.target.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
            if (pageId) switchPage(pageId);
        });
    });

    // Navigasyon Sub-Tabs Admin
    document.querySelectorAll(".sub-tab-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const subPageId = e.target.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
            if (subPageId) switchSubPage(subPageId, e.target);
        });
    });

    // Search input
    const searchInp = document.querySelector(".search-input");
    if (searchInp) {
        searchInp.addEventListener("input", (e) => renderProducts(e.target.value));
    }
}

function switchPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add("active");
    
    // Mete bouton navigasyon an active
    const activeBtn = Array.from(document.querySelectorAll("nav button")).find(b => b.innerHTML.toLowerCase().includes(pageId === 'pos-page' ? 'pos' : 'admin'));
    if (activeBtn) activeBtn.classList.add("active");
}

function switchSubPage(subPageId, activeBtn) {
    document.querySelectorAll(".sub-page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".sub-tab-btn").forEach(b => b.classList.remove("active"));
    
    const targetSubPage = document.getElementById(subPageId);
    if (targetSubPage) targetSubPage.classList.add("active");
    if (activeBtn) activeBtn.classList.add("active");
}

// ==========================================
// 3. LOGIK INTEGRAL POU LAVANT (POS)
// ==========================================
function renderProducts(filterText = "") {
    const grid = document.querySelector(".products-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = AppState.products.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));

    filtered.forEach(p => {
        const hasLowStock = p.stock <= 5;
        const prodCard = document.createElement("div");
        prodCard.className = "prod-card";
        prodCard.innerHTML = `
            ${hasLowStock ? `<span class="stock-alert">ALÈT STOCK: ${p.stock}</span>` : ''}
            <img src="${p.image}" alt="${p.name}">
            <div class="prod-info">
                <div class="prod-name">${p.name}</div>
                <div class="prod-stock">Stock: ${p.stock} inite</div>
                <div class="type-selector">
                    <button class="type-btn" onclick="addToCart(${p.id}, 'cash')">Kach: ${p.price} HTG</button>
                    <button class="type-btn" style="border-color: var(--natcash); color: var(--natcash);" onclick="addToCart(${p.id}, 'natcash')">Natcash: ${p.price} HTG</button>
                </div>
            </div>
        `;
        grid.appendChild(prodCard);
    });
}

function addToCart(productId, paymentMethod) {
    if (AppState.isLocked) return;
    const product = AppState.products.find(p => p.id === productId);
    
    if (!product || product.stock <= 0) {
        alert("Pwodwi sa a pa gen ase stock nan depo a!");
        return;
    }

    // Tcheke si item nan deja nan panyen an ak menm metòd peman an
    const cartItem = AppState.cart.find(item => item.product.id === productId && item.method === paymentMethod);

    if (cartItem) {
        if (cartItem.qty >= product.stock) {
            alert("Ou pa ka vann plis pase stock ki disponib la!");
            return;
        }
        cartItem.qty++;
    } else {
        AppState.cart.push({ product, qty: 1, method: paymentMethod });
    }

    renderCart();
}

function renderCart() {
    const tbody = document.querySelector(".cart-table tbody");
    const totalLabel = document.getElementById("bill-total");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    let total = 0;

    AppState.cart.forEach((item, index) => {
        const subtotal = item.product.price * item.qty;
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.product.name} <br> <small style="color: ${item.method === 'natcash' ? 'var(--natcash)' : 'var(--text-muted)'}; font-weight: bold;">[${item.method.toUpperCase()}]</small></td>
            <td>
                <input type="number" value="${item.qty}" min="1" max="${item.product.stock}" style="width: 50px; padding: 4px; border-radius: 4px; border: 1px solid var(--border);" onchange="updateCartQty(${index}, this.value)">
            </td>
            <td>${subtotal} HTG</td>
            <td><button onclick="removeFromCart(${index})" style="background: none; border: none; color: var(--danger); font-weight: bold; cursor: pointer;">X</button></td>
        `;
        tbody.appendChild(row);
    });

    if (totalLabel) totalLabel.innerText = `${total} HTG`;
}

function updateCartQty(index, val) {
    const item = AppState.cart[index];
    const newQty = parseInt(val);
    if (newQty > item.product.stock) {
        alert("Kantite sa a depase stock ki gen nan depo a!");
        item.qty = item.product.stock;
    } else if (newQty <= 0) {
        removeFromCart(index);
        return;
    } else {
        item.qty = newQty;
    }
    renderCart();
}

function removeFromCart(index) {
    AppState.cart.splice(index, 1);
    renderCart();
}

function validerVente() {
    if (AppState.cart.length === 0) {
        alert("Panyen an vid! Ajoute pwodwi anvan ou valide.");
        return;
    }

    AppState.cart.forEach(item => {
        // Diminye stock la
        item.product.stock -= item.qty;
        const totalAmount = item.product.price * item.qty;

        if (item.method === "cash") {
            AppState.ventesCash += totalAmount;
        } else {
            AppState.ventesNatcash += totalAmount;
        }
        
        logSystem(`Vann: ${item.qty} ${item.product.name} pa ${item.method.toUpperCase()} (${totalAmount} HTG)`);
    });

    AppState.cart = [];
    renderCart();
    renderProducts();
    recalculateFinances();
}

// ==========================================
// 4. LOJIK ENTEGRAL POU KALKIL FINANS YO
// ==========================================
function recalculateFinances() {
    // Live Cash = Fond de caisse + Lavant Kach - Depans
    AppState.liveCash = AppState.fondDeCaisse + AppState.ventesCash - AppState.depenses;
    
    // System Total Calculated = Fond de caisse + Tout Lavant Net (Kach + Natcash) - Depans
    AppState.systemTotalCalculated = AppState.fondDeCaisse + AppState.ventesCash + AppState.ventesNatcash - AppState.depenses;
    
    updateFinancialDOM();
}

function updateFinancialDOM() {
    // Mete done yo nan Stat Cards yo nan panèl admin nan
    setDOMText("stat-revenue", `${AppState.ventesCash + AppState.ventesNatcash} HTG`);
    setDOMText("stat-profit", `${(AppState.ventesCash + AppState.ventesNatcash) * 0.2} HTG`); // Simulation 20% pwofi
    setDOMText("stat-stock", `${AppState.products.reduce((acc, p) => acc + p.stock, 0)} Pcs`);
    setDOMText("stat-natcash", `${AppState.ventesNatcash} HTG`);
    setDOMText("stat-livecash", `${AppState.liveCash} HTG`);
}

function setDOMText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

// ==========================================
// 5. FONKSYON POU 3 MODAL YO (LOUVRI / KACHE)
// ==========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
}

// --- MODAL DEPANS ---
function enregistrerDepense() {
    const motif = document.getElementById("depense-motif")?.value.trim();
    const montant = parseFloat(document.getElementById("depense-montant")?.value);

    if (!motif || isNaN(montant) || montant <= 0) {
        alert("Tanpri ranpli tout jaden yo ak chif ki valab!");
        return;
    }

    if (montant > AppState.liveCash) {
        alert("Eksè de kès! Ou pa gen ase lajan kach nan kès la pou depans sa a.");
        return;
    }

    AppState.depenses += montant;
    logSystem(`Depans: ${motif} (-${montant} HTG)`);
    
    // Reyinisyalize fòm nan epi fèmen modal la
    document.getElementById("depense-motif").value = "";
    document.getElementById("depense-montant").value = "";
    closeModal("modal-depense");
    
    recalculateFinances();
}

// --- MODAL FÈMTI KÈS AVÈG ---
function soumettreFermetureAveugle() {
    const cashDeclared = parseFloat(document.getElementById("aveugle-cash")?.value);
    const natcashDeclared = parseFloat(document.getElementById("aveugle-natcash")?.value);

    if (isNaN(cashDeclared) || isNaN(natcashDeclared) || cashDeclared < 0 || natcashDeclared < 0) {
        alert("Tanpri antre montan ki kòrèk!");
        return;
    }

    // Sove deklarasyon an nan kachèt pou admin ka wè l
    AppState.declaredCashByStaff = cashDeclared;
    AppState.declaredNatcashByStaff = natcashDeclared;

    // Bloke sistèm nan nèt pou sekirite
    AppState.isLocked = true;
    closeModal("modal-fermture-aveugle");
    
    logSystem(`Kès Fèmen pa Staff la. Deklare Kach: ${cashDeclared} HTG | Natcash: ${natcashDeclared} HTG.`);
    
    // Voye moun nan sou ekran blokaj la otomatikman
    showLockScreen();
}

function showLockScreen() {
    const posLayout = document.querySelector(".pos-layout");
    if (posLayout) {
        posLayout.innerHTML = `
            <div class="card lock-screen">
                <h2 style="color: var(--danger); font-size: 24px; margin-bottom: 10px;">🔒 KÈS SA A BLOKE</h2>
                <p style="color: var(--text-muted); margin-bottom: 20px;">Staff la fin deklare fèmtu kès la. Yon administratè dwe mete modpas li pou verifye bwat la.</p>
                <button class="btn-main" style="background-color: var(--purple); max-width: 250px;" onclick="ouvrirVerificationAdmin()">Verifye Kès Kounye a</button>
            </div>
        `;
    }
    switchPage("pos-page");
}

// --- MODAL VERIFIKASYON ADMIN (AK DISPIT) ---
function ouvrirVerificationAdmin() {
    // Mete tèks yo daprè sa ki te kalkile nan sistèm nan vs sa moun nan te antre avèg la
    document.getElementById("v-system-total").innerText = `${AppState.systemTotalCalculated} HTG`;
    document.getElementById("v-staff-cash").innerText = `${AppState.declaredCashByStaff} HTG`;
    document.getElementById("v-staff-natcash").innerText = `${AppState.declaredNatcashByStaff} HTG`;

    // Kalkile diferans yo pou sistèm nan konnen si gen dispit
    const systemExpectedCash = AppState.fondDeCaisse + AppState.ventesCash - AppState.depenses;
    const systemExpectedNatcash = AppState.ventesNatcash;

    const cashDiff = AppState.declaredCashByStaff - systemExpectedCash;
    const natcashDiff = AppState.declaredNatcashByStaff - systemExpectedNatcash;

    const disputeBox = document.getElementById("dispute-box");
    const disputeReason = document.getElementById("dispute-reason");

    if (cashDiff !== 0 || natcashDiff !== 0) {
        // Gen erè nan sa manb kès la te konte a! Louvri bwat dispit la
        if (disputeBox) disputeBox.style.display = "block";
        if (disputeReason) {
            disputeReason.innerHTML = `
                <strong style="color: var(--danger);">Diferans Jwenn:</strong><br>
                Kach nan men: ${cashDiff > 0 ? '+' : ''}${cashDiff} HTG ${cashDiff < 0 ? '(Mank)' : '(Souton)'}<br>
                Natcash: ${natcashDiff > 0 ? '+' : ''}${natcashDiff} HTG
            `;
        }
        logSystem("Alèt: Dispit detekte nan verifikasyon kès la!");
    } else {
        // Tout bagay parèy pwa pou pwa
        if (disputeBox) disputeBox.style.display = "none";
        if (disputeReason) disputeReason.innerHTML = `<span style="color: var(--accent); font-weight:bold;">✓ Tout chif yo egzak pwa pou pwa!</span>`;
    }

    openModal("modal-verification");
}

function finaliserVerification(isApproved) {
    const passwordInp = document.getElementById("admin-password")?.value;
    
    // Sekirite senp: modpas la se "admin123"
    if (passwordInp !== "admin123") {
        alert("Modpas Administratè a enkòrèk!");
        return;
    }

    if (isApproved) {
        alert("Kès verifye epi apwouve ak siksè!");
        logSystem("Admin apwouve fèmti kès la. Reyinisyalizasyon.");
        resetSystemForNextShift();
    } else {
        alert("Dispit anrejistre pou kontwòl anplis. Sistèm nan ap debloke.");
        logSystem("Fèmti kès fini ak yon dispit louvri nan achiv yo.");
        resetSystemForNextShift();
    }

    // Netwaye fòm modpas la epi fèmen modal la
    document.getElementById("admin-password").value = "";
    closeModal("modal-verification");
}

function resetSystemForNextShift() {
    // Reyinisyalize eta kès la pou lòt moun ka travay
    AppState.ventesCash = 0;
    AppState.ventesNatcash = 0;
    AppState.depenses = 0;
    AppState.cart = [];
    AppState.isLocked = false;
    
    // Reload paj la pou remete Layout orijinal POS la nan plas li san Lock Screen an
    window.location.reload();
}

// ==========================================
// 6. UTILS: LOG EKIDAN AK TOGGLE THEME
// ==========================================
function logSystem(message) {
    const logList = document.getElementById("log-list");
    if (!logList) return;
    
    const time = new Date().toLocaleTimeString();
    const logLine = `[${time}] ${message}\n`;
    logList.innerText += logLine;
    
    // Scroll otomatikman nan fen log yo
    logList.scrollTop = logList.scrollHeight;
}

function toggleTheme() {
    const htmlEl = document.documentElement;
    const themeBtn = document.querySelector(".theme-toggle");
    
    if (AppState.currentTheme === "light") {
        htmlEl.setAttribute("data-theme", "dark");
        AppState.currentTheme = "dark";
        if (themeBtn) themeBtn.innerHTML = "☀️ Light Mode";
        logSystem("Sistèm chanje nan Dark Mode.");
    } else {
        htmlEl.removeAttribute("data-theme");
        AppState.currentTheme = "light";
        if (themeBtn) themeBtn.innerHTML = "🌙 Dark Mode";
        logSystem("Sistèm chanje nan Light Mode.");
    }
}
