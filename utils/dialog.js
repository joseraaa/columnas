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
    }
    
    // Función principal para mostrar diálogos
    showDialog(options) {
        // Si SweetAlert2 está disponible, usarlo
        if (this.sweetAlertAvailable && typeof Swal !== 'undefined') {
            return Swal.fire(options);
        }
        
        // Fallback a alert() nativo si SweetAlert2 no está disponible
        const message = options.text || options.title || 'Mensaje';
        alert(message);
        return Promise.resolve({ isConfirmed: true });
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
            alert('Sin conexión: ' + message);
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