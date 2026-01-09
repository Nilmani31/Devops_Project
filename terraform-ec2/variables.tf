# ---------------------------
# variables.tf
# Define variables to avoid hardcoding values
# ---------------------------

variable "key_name" {
  description = "EC2 key pair name"
  type        = string
  # You can leave blank and pass during terraform apply
  # default = "your-keypair-name"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"  # Free tier eligible
}

variable "backend_image" {
  description = "Backend Docker image (from DockerHub)"
  type        = string
  default     = "chamsha123/project-backend:latest"  
}

variable "frontend_image" {
  description = "Frontend Docker image (from DockerHub)"
  type        = string
  default     = "chamsha123/project-frontend:latest" 
