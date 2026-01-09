# ---------------------------
# main.tf
# Creates Security Group + EC2 instance + runs Docker containers
# ---------------------------

# Security Group for EC2
resource "aws_security_group" "app_sg" {
  name = "idea-app-sg"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Frontend port
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend port
  ingress {
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance + Docker setup
resource "aws_instance" "idea_app" {
  ami           = "ami-03bb6d83c60fc5f7c" # <-- Amazon Linux 2 in ap-south-1
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    amazon-linux-extras install docker -y
    service docker start
    usermod -aG docker ec2-user

    # Pull Docker images (replace these with your images)
    docker pull ${var.backend_image}
    docker pull ${var.frontend_image}

    # Run containers
    docker run -d -p 5000:5000 ${var.backend_image}
    docker run -d -p 3000:3000 ${var.frontend_image}
  EOF

  tags = {
    Name = "idea-app-ec2"
  }
}
