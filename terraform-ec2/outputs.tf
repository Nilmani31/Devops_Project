# ---------------------------
# outputs.tf
# Show EC2 public IP after deployment
# ---------------------------

output "ec2_public_ip" {
  description = "Public IP of EC2 instance"
  value       = aws_instance.idea_app.public_ip
}
