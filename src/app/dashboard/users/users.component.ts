import { Component } from '@angular/core';
import { SharedModule  } from '../../shared/shared.module';
import { IRegisterUser } from '../../core/models/model';
import { ServiceUSerService } from '../../core/services/ServiceUser/service-user.service';
import { ToastService } from '../../core/services/toast.service';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: IRegisterUser[] = [];
  selectedUser: IRegisterUser | null = null;
  filteredUsers: IRegisterUser[] = [];

  // Filter properties
  selectedStatus: string = 'all';
  selectedRole: string = 'all';
  selectedCompany: string = 'all';
  selectedCreatedAt: string = 'all';

  statusOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'owner', label: 'Owner' },
    { value: 'company', label: 'Company User' },
    { value: 'user', label: 'Regular User' },
  ];

  createdAtOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last24Hours', label: 'Last 24 Hours' },
    { value: 'last7Days', label: 'Last 7 Days' },
    { value: 'last30Days', label: 'Last 30 Days' },
    { value: 'last90Days', label: 'Last 90 Days' }
  ];

 
  get companyOptions() {
    const allOption = { value: 'all', label: 'All Companies' };
    const companies = this.users
      .filter(user => user.companyId && typeof user.companyId === 'object')
      .map(user => user.companyId as any)
      .filter((company, index, self) => 
        company && self.findIndex(c => c._id === company._id) === index
      )
      .map(company => ({ 
        value: company._id || '', 
        label: company.name || 'Unknown Company'
      }));
    return [allOption, ...companies];
  }

  // Apply all filters
  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      if (this.selectedStatus !== 'all') {
        const isActive = this.selectedStatus === 'true';
        if (user.isActive !== isActive) {
          return false;
        }
      }

      if (this.selectedRole !== 'all' && user.role !== this.selectedRole) {
        return false;
      }


      if (this.selectedCompany !== 'all') {
        const userCompanyId = typeof user.companyId === 'object' ? user.companyId?._id : user.companyId;
        if (userCompanyId !== this.selectedCompany) {
          return false;
        }
      }


      if (this.selectedCreatedAt !== 'all' && user.createdAt) {
        const userDate = new Date(user.createdAt);
        const now = new Date();
        const diffInHours = (now.getTime() - userDate.getTime()) / (1000 * 60 * 60);
        
        switch (this.selectedCreatedAt) {
          case 'last24Hours':
            if (diffInHours > 24) return false;
            break;
          case 'last7Days':
            if (diffInHours > 24 * 7) return false;
            break;
          case 'last30Days':
            if (diffInHours > 24 * 30) return false;
            break;
          case 'last90Days':
            if (diffInHours > 24 * 90) return false;
            break;
        }
      }

      return true;
    });
  }


  onStatusFilterChange(event: any) {
    this.selectedStatus = event.target.value;
    this.applyFilters();
  }

  onRoleFilterChange(event: any) {
    this.selectedRole = event.target.value;
    this.applyFilters();
  }

  onCompanyFilterChange(event: any) {
    this.selectedCompany = event.target.value;
    this.applyFilters();
  }

  onCreatedAtFilterChange(event: any) {
    this.selectedCreatedAt = event.target.value;
    this.applyFilters();
  }


  clearAllFilters() {
    this.selectedStatus = 'all';
    this.selectedRole = 'all';
    this.selectedCompany = 'all';
    this.selectedCreatedAt = 'all';
    this.applyFilters();
  }


  get hasActiveFilters(): boolean {
    return this.selectedStatus !== 'all' || 
           this.selectedRole !== 'all' || 
           this.selectedCompany !== 'all' || 
           this.selectedCreatedAt !== 'all';
  }

 


  getStatusCount(status: string): number {
    if (status === 'all') return this.users.length;
    return this.users.filter(user => user.isActive === (status === 'true')).length;
  }

  getRoleCount(role: string): number {
    if (role === 'all') return this.users.length;
    return this.users.filter(user => user.role === role).length;
  }

  getCompanyCount(companyId: string): number {
    if (companyId === 'all') return this.users.length;
    return this.users.filter(user => {
      const userCompanyId = typeof user.companyId === 'object' ? user.companyId?._id : user.companyId;
      return userCompanyId === companyId;
    }).length;
  }

  getCreatedAtCount(period: string): number {
    if (period === 'all') return this.users.length;
    
    const now = new Date();
    return this.users.filter(user => {
      if (!user.createdAt) return false;
      const userDate = new Date(user.createdAt);
      const diffInHours = (now.getTime() - userDate.getTime()) / (1000 * 60 * 60);
      
      switch (period) {
        case 'last24Hours': return diffInHours <= 24;
        case 'last7Days': return diffInHours <= 24 * 7;
        case 'last30Days': return diffInHours <= 24 * 30;
        case 'last90Days': return diffInHours <= 24 * 90;
        default: return false;
      }
    }).length;
  }

  constructor(private userService: ServiceUSerService ,  private toastService: ToastService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getallUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
        this.filteredUsers = this.users; 
        this.applyFilters(); 
        console.log('Users loaded successfully:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  patchUserapproval(userId: string) {
    if (userId) {
      this.userService.patchUser(userId).subscribe({
        next: (response) => {
          console.log('User role updated successfully:', response);
          this.getAllUsers();
          this.toastService.showSuccess('User role updated successfully!');
        },
        error: (error) => {
          console.error('Error updating user role:', error);
        }
      });
    }
  }

  deleteUser(userId: string) {
    if (userId) {
      this.userService.deleteUser(userId).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          this.getAllUsers(); 
          this.toastService.showSuccess('User deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
}
