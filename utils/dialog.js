// Sistema de alertas offline/online
class DialogSystem {
    constructor() {
        this.isOnline = navigator.onLine;
        this.sweetAlertAvailable = typeof Swal !== 'undefined';
        
        // Detectar cambios en la conexión
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('Conexión restaurada');
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineAlert();
        });
        
        // Crear estilos para el modal personalizado
        this.createCustomModalStyles();
    }
    
    // Crear estilos CSS para el modal personalizado
    createCustomModalStyles() {
        if (document.getElementById('custom-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'custom-modal-styles';
        style.textContent = `
            .custom-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(3px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease-out;
            }
            
            .custom-modal {
                background: white;
                border-radius: 15px;
                padding: 30px;
                max-width: 400px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                text-align: center;
                font-family: Arial, sans-serif;
                animation: slideIn 0.3s ease-out;
                position: relative;
            }
            
            .custom-modal-icon {
                width: 60px;
                height: 60px;
                margin: 0 auto 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 30px;
                font-weight: bold;
                color: white;
            }
            
            .custom-modal-icon.success {
                background: linear-gradient(135deg, #a5dc86, #7cb342);
            }
            
            .custom-modal-icon.error {
                background: linear-gradient(135deg, #f27474, #e53e3e);
            }
            
            .custom-modal-icon.warning {
                background: linear-gradient(135deg, #facea8, #f0c14b);
                color: #8B4513;
            }
            
            .custom-modal-icon.info {
                background: linear-gradient(135deg, #9de0f6, #3fc3ee);
            }
            
            .custom-modal-title {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                margin-bottom: 15px;
                line-height: 1.3;
            }
            
            .custom-modal-text {
                font-size: 16px;
                color: #666;
                line-height: 1.5;
                margin-bottom: 25px;
            }
            
            .custom-modal-button {
                background: linear-gradient(135deg, #8B4513, #654321);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                min-width: 100px;
            }
            
            .custom-modal-button:hover {
                background: linear-gradient(135deg, #654321, #4a2c17);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .custom-modal-button:active {
                transform: translateY(0);
            }
            
            .custom-modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                color: #999;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .custom-modal-close:hover {
                background: #f0f0f0;
                color: #666;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes slideOut {
                from { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                to { 
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
            }
            
            .custom-modal.closing {
                animation: slideOut 0.2s ease-in forwards;
            }
            
            /* Responsive design */
            @media (max-width: 768px) {
                .custom-modal {
                    padding: 25px 20px;
                    margin: 20px;
                }
                
                .custom-modal-title {
                    font-size: 20px;
                }
                
                .custom-modal-text {
                    font-size: 14px;
                }
                
                .custom-modal-button {
                    padding: 10px 25px;
                    font-size: 14px;
                }
            }
            
            /* Touch device improvements */
            @media (hover: none) and (pointer: coarse) {
                .custom-modal-button {
                    padding: 15px 30px;
                    font-size: 16px;
                }
                
                .custom-modal-close {
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Crear modal personalizado
    createCustomModal(options) {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        
        // Icono
        const icon = document.createElement('div');
        icon.className = `custom-modal-icon ${options.icon || 'info'}`;
        
        const iconSymbols = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        icon.textContent = iconSymbols[options.icon] || iconSymbols.info;
        modal.appendChild(icon);
        
        // Título
        if (options.title) {
            const title = document.createElement('div');
            title.className = 'custom-modal-title';
            title.textContent = options.title;
            modal.appendChild(title);
        }
        
        // Texto
        if (options.text) {
            const text = document.createElement('div');
            text.className = 'custom-modal-text';
            text.textContent = options.text;
            modal.appendChild(text);
        }
        
        // Botón de cerrar (X)
        const closeBtn = document.createElement('button');
        closeBtn.className = 'custom-modal-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Cerrar');
        modal.appendChild(closeBtn);
        
        // Botón principal
        if (options.showConfirmButton !== false) {
            const button = document.createElement('button');
            button.className = 'custom-modal-button';
            button.textContent = options.confirmButtonText || 'Aceptar';
            modal.appendChild(button);
            
            // Eventos del botón
            button.addEventListener('click', () => {
                this.closeCustomModal(overlay);
            });
        }
        
        // Eventos de cierre
        closeBtn.addEventListener('click', () => {
            this.closeCustomModal(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeCustomModal(overlay);
            }
        });
        
        // Cerrar con Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeCustomModal(overlay);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Auto-cerrar si se especifica timer
        if (options.timer) {
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    this.closeCustomModal(overlay);
                }
            }, options.timer);
        }
        
        // Enfocar el botón para accesibilidad
        if (options.showConfirmButton !== false) {
            setTimeout(() => {
                const button = modal.querySelector('.custom-modal-button');
                if (button) button.focus();
            }, 100);
        }
        
        return Promise.resolve({ isConfirmed: true });
    }
    
    // Cerrar modal personalizado con animación
    closeCustomModal(overlay) {
        const modal = overlay.querySelector('.custom-modal');
        modal.classList.add('closing');
        
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 200);
    }
    
    // Función principal para mostrar diálogos
    showDialog(options) {
        // Si SweetAlert2 está disponible, usarlo
        if (this.sweetAlertAvailable && typeof Swal !== 'undefined') {
            return Swal.fire(options);
        }
        
        // Usar modal personalizado como fallback
        return this.createCustomModal(options);
    }
    
    // Alerta específica para cuando se pierde la conexión
    showOfflineAlert() {
        const message = 'Se ha perdido la conexión a internet. El juego continuará funcionando sin conexión.';
        
        if (this.sweetAlertAvailable && typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Sin conexión',
                text: message,
                icon: 'warning',
                timer: 3000,
                showConfirmButton: false
            });
        } else {
            this.createCustomModal({
                title: 'Sin conexión',
                text: message,
                icon: 'warning',
                timer: 3000,
                showConfirmButton: false
            });
        }
    }
    
    // Método para mostrar éxito
    showSuccess(options) {
        const config = {
            icon: 'success',
            ...options
        };
        return this.showDialog(config);
    }
    
    // Método para mostrar error
    showError(options) {
        const config = {
            icon: 'error',
            ...options
        };
        return this.showDialog(config);
    }
    
    // Método para mostrar advertencia
    showWarning(options) {
        const config = {
            icon: 'warning',
            ...options
        };
        return this.showDialog(config);
    }
    
    // Método para mostrar información
    showInfo(options) {
        const config = {
            icon: 'info',
            ...options
        };
        return this.showDialog(config);
    }
}

// Crear instancia global
window.DialogSystem = new DialogSystem();

// Función global para compatibilidad con el código existente
window.showDialog = function(options) {
    return window.DialogSystem.showDialog(options);
};