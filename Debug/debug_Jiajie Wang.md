# Debug

Author: Jiajie Wang

## Exercise 1

1   It does not print the fruit at the correct index, why is the returned result wrong?

Bug: 

```
def id_to_fruit(fruit_id: int, fruits: Set[str]) -> str:
```

A set is an unordered data structure that does not contain duplicate elements. Because a set is unordered, the traversal order is uncertain, resulting in unreliable indexes.

------

2   How could this be fixed?

Modification: 

```
def id_to_fruit(fruit_id: int, fruits: List[str]) -> str:
```

```
name1 = id_to_fruit(1, ["apple", "orange", "melon", "kiwi", "strawberry"])
name3 = id_to_fruit(3, ["apple", "orange", "melon", "kiwi", "strawberry"])
name4 = id_to_fruit(4, ["apple", "orange", "melon", "kiwi", "strawberry"])
```

Use List[str] instead of Set[str] and pass the list type when calling the function

------

The complete code after modification:

```
# def id_to_fruit(fruit_id: int, fruits: Set[str]) -> str:
# bug: A set is an unordered data structure that does not contain duplicate elements. Use List[str] to replace

def id_to_fruit(fruit_id: int, fruits: List[str]) -> str:
    """
    This method returns the fruit name by getting the string at a specific index of the set.

    :param fruit_id: The id of the fruit to get
    :param fruits: The set of fruits to choose the id from
    :return: The string corrosponding to the index ``fruit_id``

    **This method is part of a series of debugging exercises.**
    **Each Python method of this series contains bug that needs to be found.**

    | ``1   It does not print the fruit at the correct index, why is the returned result wrong?``
    | ``2   How could this be fixed?``

    This example demonstrates the issue:
    name1, name3 and name4 are expected to correspond to the strings at the indices 1, 3, and 4:
    'orange', 'kiwi' and 'strawberry'..

    >>> name1 = id_to_fruit(1, {"apple", "orange", "melon", "kiwi", "strawberry"})
    >>> name3 = id_to_fruit(3, {"apple", "orange", "melon", "kiwi", "strawberry"})
    >>> name4 = id_to_fruit(4, {"apple", "orange", "melon", "kiwi", "strawberry"})
    """
    idx = 0
    for fruit in fruits:
        if fruit_id == idx:
            return fruit
        idx += 1
    raise RuntimeError(f"Fruit with id {fruit_id} does not exist")

# name1 = id_to_fruit(1, {"apple", "orange", "melon", "kiwi", "strawberry"})
# name3 = id_to_fruit(3, {"apple", "orange", "melon", "kiwi", "strawberry"})
# name4 = id_to_fruit(4, {"apple", "orange", "melon", "kiwi", "strawberry"})
# Pass in the list type when calling the function

name1 = id_to_fruit(1, ["apple", "orange", "melon", "kiwi", "strawberry"])
name3 = id_to_fruit(3, ["apple", "orange", "melon", "kiwi", "strawberry"])
name4 = id_to_fruit(4, ["apple", "orange", "melon", "kiwi", "strawberry"])
```



## Exercise 2

1   Can you spot the obvious error?

Bug:

```
coords[:, 0], coords[:, 1], coords[:, 2], coords[:, 3], = coords[:, 1], coords[:, 1], coords[:, 3], coords[:, 2]
```

There is an extra comma here coords[:, 3], syntax error
coords[:, 0] and coords[:, 1] are assigned the same value.

------

2   After fixing the obvious error it is still wrong, how can this be fixed?

Bug:

```
coords[:, 0], coords[:, 1], coords[:, 2], coords[:, 3] = coords[:, 1], coords[:, 0], coords[:, 3], coords[:, 2]
```

NumPy's assignment operation is performed one by one, not atomically, and is performed from left to right, which can lead to inconsistent intermediate states.
coords[:, 0] = coords[:, 1]: Assign the value of column 1 to column 0.
coords[:, 1] = coords[:, 0]: At this time, column 0 has been modified, so column 1 will be assigned the value of the modified column 0.
coords[:, 2] = coords[:, 3]: Assign the value of column 3 to column 2.
coords[:, 3] = coords[:, 2]: At this time, column 2 has been modified, so column 3 will be assigned the value of the modified column 2.
This order will cause data to be overwritten.

The correct logic should be:
Swap the first and second columns.
Swap the third and fourth columns.

Modification: 

```
coords[:, [0, 1]] = coords[:, [1, 0]]
coords[:, [2, 3]] = coords[:, [3, 2]]
```

------

The complete code after modification:

```
def swap(coords: np.ndarray):
    """
    This method will flip the x and y coordinates in the coords array.

    :param coords: A numpy array of bounding box coordinates with shape [n,5] in format:
        ::

            [[x11, y11, x12, y12, classid1],
             [x21, y21, x22, y22, classid2],
             ...
             [xn1, yn1, xn2, yn2, classid3]]

    :return: The new numpy array where the x and y coordinates are flipped.

    **This method is part of a series of debugging exercises.**
    **Each Python method of this series contains bug that needs to be found.**

    | ``1   Can you spot the obvious error?``
    | ``2   After fixing the obvious error it is still wrong, how can this be fixed?``

    >>> import numpy as np
    >>> coords = np.array([[10, 5, 15, 6, 0],
    ...                    [11, 3, 13, 6, 0],
    ...                    [5, 3, 13, 6, 1],
    ...                    [4, 4, 13, 6, 1],
    ...                    [6, 5, 13, 16, 1]])
    >>> swapped_coords = swap(coords)

    The example demonstrates the issue. The returned swapped_coords are expected to have swapped
    x and y coordinates in each of the rows.
    """
    # coords[:, 0], coords[:, 1], coords[:, 2], coords[:, 3], = coords[:, 1], coords[:, 1], coords[:, 3], coords[:, 2]
    # bug:
    #   There is an extra comma here coords[:, 3], syntax error
    #   coords[:, 0] and coords[:, 1] are assigned the same value.
    #   The values of coords[:, 2] and coords[:, 3] are incorrectly swapped.

    # coords[:, 0], coords[:, 1], coords[:, 2], coords[:, 3] = coords[:, 1], coords[:, 0], coords[:, 3], coords[:, 2]

    coords[:, [0, 1]] = coords[:, [1, 0]]
    coords[:, [2, 3]] = coords[:, [3, 2]]
    return coords

import numpy as np
coords = np.array([[10, 5, 15, 6, 0],
                   [11, 3, 13, 6, 0],
                   [5, 3, 13, 6, 1],
                   [4, 4, 13, 6, 1],
                   [6, 5, 13, 16, 1]])
swapped_coords = swap(coords)
```



## Exercise 3

1   For some reason the plot is not showing correctly, can you find out what is going wrong?

Bug1：

```
csv_reader = csv.reader(result_csv, delimiter=',')
```

```
results.append(row)
```

When csv.reader reads a CSV file, each row of data is parsed into a list of strings. So results is a list of strings, but when drawing a curve, plt.plot requires a numeric type (such as float or int)



Bug2：

```
results = np.stack(results)
```

```
w.writerows([[0.013,0.951],
             [0.376,0.851],
             [0.441,0.839],
             [0.570,0.758],
             [0.635,0.674],
             [0.721,0.604],
             [0.837,0.531],
             [0.860,0.453],
             [0.962,0.348],
             [0.982,0.273],
             [1.0,0.0]])
```

np.stack will stack multiple arrays along a new axis (dimension), which may cause unnecessary dimension changes. It is more appropriate to use np.array. 

np.array will directly convert a two-dimensional list into a two-dimensional array without adding new dimensions.

```
results = [[], [0.013, 0.951], [], [0.376, 0.851], [], [0.441, 0.839], [], [0.57, 0.758], []，...]
```

Debug sees that there are empty lists in results, which comes from the blank lines in the csv file, so I need to skip blank lines and lines with incorrect lengths.



Bug3：

```
plt.plot(results[:, 1], results[:, 0])
```

```
plt.xlabel('Recall')
plt.ylabel('Precision')
```

From the output image, we can see that the recall rate (`results[:, 1]`) is actually used as the x-axis and the precision rate (`results[:, 0]`) is used as the y-axis, which is inconsistent with the function description.

------

2   How could this be fixed?

Modification1:

```
results.append([float(value) for value in row])
```

As each line of data is read, convert the string to a floating point number



Modification2:

```
if not row or len(row) != 2:
   continue
```

Skip empty lines and lines of incorrect length

```
results = np.array(results)
```

np.array will directly convert the two-dimensional list into a two-dimensional array, avoiding the unnecessary dimension changes introduced by np.stack



Modification3:

```
plt.plot(results[:, 0], results[:, 1])
```

```
plt.xlabel('Precision')
plt.ylabel('Recall')
```

Set the x-axis to precision and the y-axis to recall

------

The complete code after modification:

```
def plot_data(csv_file_path: str):
    """
    This code plots the precision-recall curve based on data from a .csv file,
    where precision is on the x-axis and recall is on the y-axis.
    It it not so important right now what precision and recall means.

    :param csv_file_path: The CSV file containing the data to plot.


    **This method is part of a series of debugging exercises.**
    **Each Python method of this series contains bug that needs to be found.**

    | ``1   For some reason the plot is not showing correctly, can you find out what is going wrong?``
    | ``2   How could this be fixed?``

    This example demonstrates the issue.
    It first generates some data in a csv file format and the plots it using the ``plot_data`` method.
    If you manually check the coordinates and then check the plot, they do not correspond.

    >>> f = open("data_file.csv", "w")
    >>> w = csv.writer(f)
    >>> _ = w.writerow(["precision", "recall"])
    >>> w.writerows([[0.013,0.951],
    ...              [0.376,0.851],
    ...              [0.441,0.839],
    ...              [0.570,0.758],
    ...              [0.635,0.674],
    ...              [0.721,0.604],
    ...              [0.837,0.531],
    ...              [0.860,0.453],
    ...              [0.962,0.348],
    ...              [0.982,0.273],
    ...              [1.0,0.0]])
    >>> f.close()
    >>> plot_data('data_file.csv')
    """
    # load data
    results = []
    with open(csv_file_path) as result_csv:
        csv_reader = csv.reader(result_csv, delimiter=',')
        next(csv_reader)
        for row in csv_reader:
            # results.append(row)
            # bug: When csv.reader reads a CSV file, each row of data is parsed into a list of strings. So results is a list of strings, but when drawing a curve, plt.plot requires a numeric type (such as float or int)
            # Skip empty lines and lines of incorrect length
            if not row or len(row) != 2:
                continue
            results.append([float(value) for value in row])

        # results = np.stack(results)
        # bug:np.stack will stack multiple arrays along a new axis (dimension), which may cause unnecessary dimension changes. It is more appropriate to use np.array.
        results = np.array(results)

    # plot precision-recall curve

    # plt.plot(results[:, 1], results[:, 0])
    # From the output image, we can see that the recall rate (`results[:, 1]`) is actually used as the x-axis and the precision rate (`results[:, 0]`) is used as the y-axis, which is inconsistent with the function description.
    plt.plot(results[:, 0], results[:, 1])  # Precision on x-axis, Recall on y-axis

    plt.ylim([-0.05, 1.05])
    plt.xlim([-0.05, 1.05])

    # plt.xlabel('Recall')
    # plt.ylabel('Precision')
    plt.xlabel('Precision')
    plt.ylabel('Recall')

    plt.show()

f = open("data_file.csv", "w")
w = csv.writer(f)
_ = w.writerow(["precision", "recall"])
w.writerows([[0.013,0.951],
             [0.376,0.851],
             [0.441,0.839],
             [0.570,0.758],
             [0.635,0.674],
             [0.721,0.604],
             [0.837,0.531],
             [0.860,0.453],
             [0.962,0.348],
             [0.982,0.273],
             [1.0,0.0]])
f.close()
plot_data('data_file.csv')
```



## Exercise 4

1   Changing the batch_size from 32 to 64 triggers the structural bug.

I added the following code so that I could find the problem

```
try:
    train_set = torchvision.datasets.MNIST(root=".", train=True, download=True, transform=transform)
    # addition
    print(f"Total number of samples in the MNIST training set: {len(train_set)}")
```

```
# train
    for epoch in range(num_epochs):
        for n, (real_samples, mnist_labels) in enumerate(train_loader):
            # addition
            if real_samples.size(0) < batch_size:
                print(f"[Warning] epoch={epoch}, batch_index={n}, real_samples.size(0)={real_samples.size(0)}, batch_size={batch_size}")
                print(f"real_samples.shape: {real_samples.shape}")
```

In the training loop, the actual batch size of real_samples may be smaller than the set batch_size, especially in the last batch (because the total number of samples in the dataset may not be an integer multiple of batch_size). The generated fake samples (generated_samples) are always the same as batch_size. This causes the number of all_samples and the number of labels after concatenation to be inconsistent with the actual input.

By outputting the number of samples in the MNIST training set, I learned that there are 60000 samples in total. When batch_size=32, 60000/32=1875, which is exactly divisible, so each batch is 32 and there will be no error.
When batch_size=64, 60000/64=937.5, and the last batch has only 32 samples, which will cause the dimension inconsistency problem.
And I caught this error message:

```
[Warning] epoch=0, batch_index=937, real_samples.size(0)=32, batch_size=64
real_samples.shape: torch.Size([32, 1, 28, 28])
```

------

2   Can you also spot the cosmetic bug?

```
if n == batch_size - 1:
```

The original condition if n == batch_size - 1: means "when n is equal to batch_size - 1", for example, when batch_size=32, the image will be displayed only when n==31. But in fact, the maximum value of n should be len(train_loader) - 1, which is "the number of the last batch". Note: batch_size has no direct relationship with the number of batches. batch_size is the number of samples in each batch, and len(train_loader) is the total number of batches.

Modification:

```
if n == len(train_loader) - 1:
```

------

The complete code after modification:

```
def train_gan(batch_size: int = 32, num_epochs: int = 100, device: str = "cuda:0" if torch.cuda.is_available() else "cpu"):
    """
    The method trains a Generative Adversarial Network and is based on:
    https://realpython.com/generative-adversarial-networks/

    The Generator network tries to generate convincing images of handwritten digits.
    The Discriminator needs to detect if the image was created by the Generater or if the image is a real image from
    a known dataset (MNIST).
    If both the Generator and the Discriminator are optimized, the Generator is able to create images that are difficult
    to distinguish from real images. This is goal of a GAN.

    This code produces the expected results at first attempt at about 50 epochs.

    :param batch_size: The number of images to train in one epoch.
    :param num_epochs: The number of epochs to train the gan.
    :param device: The computing device to use. If CUDA is installed and working then `cuda:0` is chosen
        otherwise 'cpu' is chosen. Note: Training a GAN on the CPU is very slow.

    **This method is part of a series of debugging exercises.**
    **Each Python method of this series contains bug that needs to be found.**

    It contains at least two bugs: one structural bug and one cosmetic bug. Both bugs are from the original tutorial.

    | ``1   Changing the batch_size from 32 to 64 triggers the structural bug.``
    | ``2   Can you also spot the cosmetic bug?``
    | ``Note: to fix this bug a thorough understanding of GANs is not necessary.``

    Change the batch size to 64 to trigger the bug with message:
    ValueError: "Using a target size (torch.Size([128, 1])) that is different to the input size (torch.Size([96, 1])) is deprecated. Please ensure they have the same size."

    >>> train_gan(batch_size=32, num_epochs=100)
    """
    # Add/adjust code.
    """
    数据预处理
    定义了一个数据预处理流程，将图像转换为张量，并进行归一化处理。
    归一化将像素值从 [0, 1] 转换为 [-1, 1]，有助于训练
    """

    transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])

    # 下载和加载 MNIST 数据集
    try:
        train_set = torchvision.datasets.MNIST(root=".", train=True, download=True, transform=transform)
        # print(f"MNIST训练集样本总数: {len(train_set)}")
        print(f"Total number of samples in the MNIST training set: {len(train_set)}")
    except:
        print("Failed to download MNIST, retrying with different URL")
        # see: https://github.com/pytorch/vision/blob/master/torchvision/datasets/mnist.py
        torchvision.datasets.MNIST.resources = [
            ('https://ossci-datasets.s3.amazonaws.com/mnist/train-images-idx3-ubyte.gz',
             'f68b3c2dcbeaaa9fbdd348bbdeb94873'),
            ('https://ossci-datasets.s3.amazonaws.com/mnist/train-labels-idx1-ubyte.gz',
             'd53e105ee54ea40749a09fcbcd1e9432'),
            ('https://ossci-datasets.s3.amazonaws.com/mnist/t10k-images-idx3-ubyte.gz',
             '9fb629c4189551a2d022fa330f9573f3'),
            ('https://ossci-datasets.s3.amazonaws.com/mnist/t10k-labels-idx1-ubyte.gz',
             'ec29112dd5afa0611ce80d1b7f02629c')
        ]
        train_set = torchvision.datasets.MNIST(root=".", train=True, download=True, transform=transform)

    # 创建数据加载器 批量加载数据
    train_loader = torch.utils.data.DataLoader(train_set, batch_size=batch_size, shuffle=True)

    # example data
    # 从数据加载器中获取一批真实图像，并显示其中的 16 张图像
    real_samples, mnist_labels = next(iter(train_loader))

    fig = plt.figure()
    for i in range(16):
        sub = fig.add_subplot(4, 4, 1 + i)
        sub.imshow(real_samples[i].reshape(28, 28), cmap="gray_r")
        sub.axis('off')

    fig.tight_layout()
    fig.suptitle("Real images")
    display(fig)

    time.sleep(5)

    # Set up training
    # 设置训练参数 定义学习率、损失函数和优化器
    discriminator = Discriminator().to(device)
    generator = Generator().to(device)
    lr = 0.0001
    loss_function = nn.BCELoss()
    optimizer_discriminator = torch.optim.Adam(discriminator.parameters(), lr=lr)
    optimizer_generator = torch.optim.Adam(generator.parameters(), lr=lr)

    # train
    for epoch in range(num_epochs): # 每一轮（epoch）都遍历整个训练数据集一次
        for n, (real_samples, mnist_labels) in enumerate(train_loader): # n是当前批次的索引 每次循环会获取一个批次的真实图像 real_samples 和对应的标签 mnist_labels
            # 检查实际 batch 大小
            if real_samples.size(0) < batch_size:
                print(f"[Warning] epoch={epoch}, batch_index={n}, real_samples.size(0)={real_samples.size(0)}, batch_size={batch_size}")
                print(f"real_samples.shape: {real_samples.shape}")

            # Data for training the discriminator
            real_samples = real_samples.to(device=device) # 真实图像
            real_samples_labels = torch.ones((batch_size, 1)).to(device=device) # 真实图像的标签，用 1 表示
            latent_space_samples = torch.randn((batch_size, 100)).to(device=device) # 从随机噪声中生成的样本,用于生成器生成图像
            generated_samples = generator(latent_space_samples) # 生成器生成的图像
            generated_samples_labels = torch.zeros((batch_size, 1)).to(device=device)   # 生成图像的标签，用 0 表示
            all_samples = torch.cat((real_samples, generated_samples))  # 将真实图像和生成图像合并
            all_samples_labels = torch.cat((real_samples_labels, generated_samples_labels)) # 将真实图像的标签和生成图像的标签合并

            # Training the discriminator
            discriminator.zero_grad()   # 清零判别器的梯度，避免梯度累积
            output_discriminator = discriminator(all_samples)   # 判别器对所有样本（真实和生成）的输出
            loss_discriminator = loss_function(output_discriminator, all_samples_labels)    # 计算判别器的损失，使用二值交叉熵损失函数
            loss_discriminator.backward()   # 计算损失的梯度
            optimizer_discriminator.step()  # 更新判别器的权重

            # Data for training the generator
            latent_space_samples = torch.randn((batch_size, 100)).to(device=device)

            # Training the generator
            generator.zero_grad()
            generated_samples = generator(latent_space_samples)
            output_discriminator_generated = discriminator(generated_samples)
            loss_generator = loss_function(output_discriminator_generated, real_samples_labels)
            loss_generator.backward()
            optimizer_generator.step()

            # Show loss and samples generated
            # if n == batch_size - 1:
            # bug: batch_size is the number of samples in each batch, and len(train_loader) is the total number of batches.
            if n == len(train_loader) - 1:
                name = f"Generate images\n Epoch: {epoch} Loss D.: {loss_discriminator:.2f} Loss G.: {loss_generator:.2f}"
                generated_samples = generated_samples.detach().cpu().numpy()
                fig = plt.figure()
                for i in range(16):
                    sub = fig.add_subplot(4, 4, 1 + i)
                    sub.imshow(generated_samples[i].reshape(28, 28), cmap="gray_r")
                    sub.axis('off')
                fig.suptitle(name)
                fig.tight_layout()
                clear_output(wait=False)
                display(fig)


train_gan(batch_size=32, num_epochs=100)
```

