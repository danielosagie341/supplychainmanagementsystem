export enum UserType{
    INDIVIDUAL = "Individual",
    ENTERPRISE = "Enterprise",
    ADMIN = "Admin",
    SUBADMIN = "SubAdmin",
}

export enum UserStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    DELETED = 'Deleted',
}

export enum IdentityStatus {
    REJECTED = "rejected",
    APPROVED = "approved",
    PENDING = "pending"
}